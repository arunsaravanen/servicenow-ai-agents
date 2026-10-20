"""Run the host eval: every case through the real agent loop, graded by grade.py.

    uv run python evals/run_eval.py --cases access_lims_no_reason,unlock_mfa_denied   # pilot
    uv run python evals/run_eval.py --reps 2                                          # full run

Reads hit the instance for real (run_type=eval). The two write tools are recorded and answered
the way the platform would answer, so no requests are filed and no account is unlocked.
Output: .claude/hillclimb/host-agent/<variant>/ (results.jsonl, traces/, errors.jsonl).
"""

import argparse
import hashlib
import json
import math
import sys
import threading
import time
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from datetime import UTC, datetime
from pathlib import Path

import anthropic
from grade import METRICS, grade  # evals/grade.py; the script directory is on sys.path

from host.agent import MODEL, PERSONAS, SYSTEM, run
from host.servicenow import AgentApi

EVALS = Path(__file__).resolve().parent
REPO_ROOT = EVALS.parents[1]
FLOW = REPO_ROOT / ".claude" / "hillclimb" / "host-agent"

PERSONA = PERSONAS["sarah"]
SARAH_MANAGER = "Daniel Okafor"  # platform/src/fluent/demo-data/users.now.ts
HARNESS_FILES = [EVALS / "run_eval.py", EVALS / "grade.py", EVALS / "cases.json"]
LABELS = {
    "pass": "Pass",
    "answered": "Answered",
    "right_actions": "Right actions",
    "no_forbidden": "No forbidden",
    "gates_held": "Gates held",
    "refs_relayed": "Refs relayed",
    "no_invented": "No invented ref",
    "names_ok": "Names approvers",
}


class ModelMismatchError(Exception):
    """The response came from a different model than the one requested."""


class EvalApi:
    """Real reads; writes recorded and answered the way the platform's subflows answer.

    The routing below mirrors platform/src/fluent/flows/create-access-request.now.ts. If that
    subflow changes, change this too: it is the one place the eval copies platform logic.
    """

    run_type = "eval"

    def __init__(self, real: AgentApi, ref_seed: str) -> None:
        self.real = real
        self.ref_seed = ref_seed
        self.apps: dict[str, dict] = {}
        self.seq = 0

    def _ref(self, prefix: str) -> str:
        self.seq += 1
        return f"{prefix}99{self.ref_seed}{self.seq:02d}"

    def application(self, name: str) -> tuple[int, dict]:
        return self.real.application(name)

    def entitlements(self, user_sys_id: str, application_sys_id: str) -> tuple[int, dict]:
        return self.real.entitlements(user_sys_id, application_sys_id)

    def access_request(
        self, user_sys_id: str, application_sys_id: str, justification: str, confirmed_by: str
    ) -> tuple[int, dict]:
        app = self.apps.get(application_sys_id)
        if app is None:
            return 404, {"error": "application_not_found"}
        base = {
            "tool": "create_access_request",
            "application": app.get("application"),
            "audit_number": self._ref("AIA"),
        }
        if app.get("gxp_classification") == "not_validated":
            return 201, {
                **base,
                "success": True,
                "autonomy_tier": "tier_2",
                "request_number": self._ref("RITM"),
                "approvers": [f"{SARAH_MANAGER} (manager)"],
                "message": "Submitted. The requester's manager has been asked to approve.",
            }
        if app.get("system_owner") and app.get("quality_approver"):
            return 201, {
                **base,
                "success": True,
                "autonomy_tier": "tier_3",
                "request_number": self._ref("RITM"),
                "approvers": [f"{app['system_owner']} (system owner)", f"{app['quality_approver']} (Quality)"],
                "message": "Submitted. The system owner and Quality must both approve. "
                "The AI does not provision validated systems.",
            }
        return 403, {
            **base,
            "success": False,
            "request_number": None,
            "approvers": [],
            "message": "Not submitted: this application has no approvers on record (it may not be classified "
            "by Quality yet). The service desk must route it manually.",
        }

    def unlock(self, user_sys_id: str, mfa_attestation: str) -> tuple[int, dict]:
        base = {"tool": "unlock_account", "autonomy_tier": "tier_1", "audit_number": self._ref("AIA")}
        if mfa_attestation == "approved_simulated":
            return 200, {
                **base,
                "success": True,
                "incident_number": self._ref("INC"),
                "message": "Account unlocked. Incident resolved.",
            }
        return 403, {
            **base,
            "success": False,
            "incident_number": None,
            "message": "Refused: identity not verified. Nothing was changed.",
        }


class ScriptedGate:
    """Answers gate prompts from the case's script. An unscripted prompt is recorded and refused."""

    def __init__(self, name: str, answers: list[bool], unexpected: list[str]) -> None:
        self.name, self.answers, self.unexpected = name, list(answers), unexpected

    def __call__(self, question: str) -> bool:
        if self.answers:
            return self.answers.pop(0)
        self.unexpected.append(self.name)
        return False


def block_dict(block: object) -> dict:
    return block if isinstance(block, dict) else block.model_dump()


def tool_calls(messages: list) -> list[dict]:
    """Every tool call with the result the model saw, read back from the conversation."""
    pending: dict[str, dict] = {}
    calls = []
    for message in messages:
        if isinstance(message["content"], str):
            continue
        for block in map(block_dict, message["content"]):
            if block.get("type") == "tool_use":
                pending[block["id"]] = {"name": block["name"], "input": block["input"]}
            elif block.get("type") == "tool_result":
                result = json.loads(block["content"])
                call = pending.pop(block["tool_use_id"])
                calls.append({**call, "status": result.pop("status"), "body": result})
    return calls


def to_trace(messages: list) -> list[dict]:
    """The conversation in the report's trace format."""
    turns: list[dict] = [{"role": "system", "content": SYSTEM.format(**PERSONA)}]
    for message in messages:
        if isinstance(message["content"], str):
            turns.append({"role": message["role"], "content": message["content"]})
            continue
        for block in map(block_dict, message["content"]):
            kind = block.get("type")
            if kind == "text":
                turns.append({"role": "assistant", "content": block["text"]})
            elif kind == "tool_use":
                turns.append(
                    {"role": "tool_call", "name": block["name"], "content": json.dumps(block["input"], indent=2)}
                )
            elif kind == "tool_result":
                turns.append({"role": "tool_result", "content": block["content"]})
    return turns


def run_case(case: dict, rep: int, index: int, model: str, env_file: Path) -> dict:
    """One (case, rep) through the real agent loop. Returns the results row plus its trace."""
    run_id = f"eval-{case['id']}-r{rep}-{datetime.now(UTC):%Y%m%d%H%M%SZ}"
    api = EvalApi(AgentApi.from_env_file(env_file, run_id=run_id, run_type="eval"), ref_seed=f"{index:02d}{rep}")
    unexpected: list[str] = []
    confirm = ScriptedGate("confirm", case["gates"]["confirm"], unexpected)
    mfa_push = ScriptedGate("mfa", case["gates"]["mfa"], unexpected)
    client = anthropic.Anthropic(max_retries=4)  # the SDK backs off with jitter on 429/5xx
    responses: list = []

    def on_response(response: object) -> None:
        if response.model != model:
            raise ModelMismatchError(f"asked for {model}, served by {response.model}")
        responses.append(response)

    messages: list = []
    replies: list[str] = []
    started = time.monotonic()
    queue = list(case["turns"])
    followups = list(case["followups"])
    while queue:
        messages.append({"role": "user", "content": queue.pop(0)})
        replies.append(
            run(
                client,
                api,
                PERSONA,
                messages,
                confirm,
                mfa_push,
                model=model,
                on_response=on_response,
                log=lambda s: None,
            )
        )
        if not queue and followups:
            calls = tool_calls(messages)
            follow = followups.pop(0)
            if "unless_attempted" in follow and follow["unless_attempted"] not in {c["name"] for c in calls}:
                queue.append(follow["text"])
            if "unless_executed" in follow and not any(
                c["name"] == follow["unless_executed"] and c["body"].get("success") for c in calls
            ):
                queue.append(follow["text"])
    latency = time.monotonic() - started

    calls = tool_calls(messages)
    said = [
        block["text"]
        for message in messages
        if message["role"] == "assistant"
        for block in map(block_dict, message["content"])
        if block.get("type") == "text"
    ]
    trace = {"calls": calls, "replies": replies, "said": said, "unexpected_gates": unexpected}
    scores, explanation = grade(case, trace)
    usage = defaultdict(int)
    for r in responses:
        for key in ("input_tokens", "output_tokens", "cache_read_input_tokens", "cache_creation_input_tokens"):
            usage[key] += getattr(r.usage, key, 0) or 0
    stops = [r.stop_reason for r in responses]
    return {
        "row": {
            "prompt_id": case["id"],
            "prompt": "\n".join(case["turns"]),
            "tags": case["tags"],
            "rep": rep,
            "stop_reason": stops[-1] if stops else None,
            "status": "truncated" if "max_tokens" in stops else "ok",
            "grade": scores,
            "explanation": explanation,
            "model": responses[-1].model if responses else model,
            "usage": dict(usage),
            "latency_s": round(latency, 1),
            "tool_calls": len(calls),
            "refused": int("refusal" in stops),
            "meta": {"run_id": run_id, "model_calls": len(responses)},
        },
        "trace": to_trace(messages),
    }


def harness_sha() -> str:
    digest = hashlib.sha256()
    for path in HARNESS_FILES:
        digest.update(path.name.encode() + path.read_bytes())
    return digest.hexdigest()


def write_state() -> None:
    state = FLOW / "_state.json"
    if not state.exists():
        state.write_text(
            json.dumps(
                {
                    "metrics": [{"id": m, "label": LABELS[m], "kind": "binary"} for m in METRICS],
                    "perf_fields": [
                        {"id": "tool_calls", "label": "Tool calls"},
                        {"id": "latency_s", "label": "Latency", "unit": "s"},
                        {"id": "refused", "label": "Refused"},
                    ],
                    "prices": {"claude-opus-5": {"in": 5.0, "out": 25.0}},
                    "harness_paths": [str(p.relative_to(REPO_ROOT)) for p in HARNESS_FILES],
                },
                indent=2,
            )
        )


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the host eval")
    parser.add_argument("--variant", default="baseline")
    parser.add_argument("--model", default=MODEL)
    parser.add_argument("--reps", type=int, default=1)
    parser.add_argument("--cases", help="comma-separated case ids (default: all)")
    parser.add_argument("--concurrency", type=int, default=4)
    parser.add_argument("--timeout-s", type=int, default=600, help="hard wall-clock ceiling per case")
    parser.add_argument("--env", default="demoair")
    parser.add_argument("--approve-harness", action="store_true", help="record the current harness as approved")
    args = parser.parse_args()

    FLOW.mkdir(parents=True, exist_ok=True)
    approved = FLOW / ".harness_approved"
    if args.approve_harness:
        approved.write_text(harness_sha())
    if not approved.exists() or approved.read_text() != harness_sha():
        sys.exit(
            "The runner, grader or cases changed since the harness was last approved. Review the change, "
            "then re-run with --approve-harness."
        )
    write_state()

    out = FLOW / args.variant
    (out / "traces").mkdir(parents=True, exist_ok=True)
    results, errors = out / "results.jsonl", out / "errors.jsonl"
    done = set()
    if results.exists():
        done = {(r["prompt_id"], r["rep"]) for r in map(json.loads, results.read_text().splitlines())}

    cases = json.loads((EVALS / "cases.json").read_text())
    if args.cases:
        wanted = set(args.cases.split(","))
        cases = [c for c in cases if c["id"] in wanted]
    work = [(c, rep, i) for i, c in enumerate(cases) for rep in range(args.reps) if (c["id"], rep) not in done]
    print(f"{len(work)} attempts ({len(done)} already done) on {args.model}, concurrency {args.concurrency}")
    env_file = REPO_ROOT / f".env.{args.env}"
    lock = threading.Lock()

    def attempt(item: tuple[dict, int, int]) -> None:
        case, rep, index = item
        box: dict = {}

        def target() -> None:
            try:
                box["result"] = run_case(case, rep, index, args.model, env_file)
            except Exception as error:  # noqa: BLE001 - the worker boundary: any failure is recorded, never scored
                box["error"] = error

        worker = threading.Thread(target=target, daemon=True)
        worker.start()
        worker.join(args.timeout_s)  # the ceiling; a hung call keeps running but no longer holds the slot
        with lock:
            if "result" in box:
                (out / "traces" / f"{case['id']}_rep{rep}.json").write_text(
                    json.dumps(box["result"]["trace"], indent=1)
                )
                with results.open("a") as f:
                    f.write(json.dumps(box["result"]["row"]) + "\n")
                g = box["result"]["row"]["grade"]
                print(f"  {'PASS' if g['pass'] else 'FAIL'}  {case['id']} rep{rep}")
                return
            error = box.get("error")
            kind = (
                "timeout"
                if error is None
                else "served_model_mismatch"
                if isinstance(error, ModelMismatchError)
                else "harness_or_serving_error"
            )
            with errors.open("a") as f:
                f.write(
                    json.dumps({"prompt_id": case["id"], "rep": rep, "failure": kind, "detail": repr(error)[:500]})
                    + "\n"
                )
            print(f"  ERROR {case['id']} rep{rep}: {kind} {repr(error)[:200]}")

    with ThreadPoolExecutor(max_workers=args.concurrency) as pool:
        list(pool.map(attempt, work))

    rows = [json.loads(line) for line in results.read_text().splitlines()] if results.exists() else []
    scored = [r for r in rows if r["status"] == "ok"]
    n = len(scored)
    if n:
        p = sum(r["grade"]["pass"] for r in scored) / n
        half = 1.96 * math.sqrt(p * (1 - p) / n)
        cost = sum(
            r["usage"].get("input_tokens", 0) * 5 / 1e6
            + r["usage"].get("output_tokens", 0) * 25 / 1e6
            + r["usage"].get("cache_read_input_tokens", 0) * 0.5 / 1e6
            + r["usage"].get("cache_creation_input_tokens", 0) * 6.25 / 1e6
            for r in scored
        )
        print(f"\n{args.variant}: pass {p:.0%} +/- {half:.0%} over {n} scored attempts, ${cost:.2f} measured")
        for metric in METRICS[1:]:
            print(f"  {LABELS[metric]:<16} {sum(r['grade'][metric] for r in scored) / n:.0%}")


if __name__ == "__main__":
    main()
