"""Terminal demo: chat as a persona while the host enforces the human gates.

uv run helix-agent                     # Sarah Chen on demoair
uv run helix-agent --persona sarah --env demoair
"""

import argparse
from datetime import UTC, datetime
from pathlib import Path

import anthropic

from host.agent import PERSONAS, run
from host.servicenow import AgentApi

REPO_ROOT = Path(__file__).resolve().parents[3]  # host/src/host/cli.py -> repo root


def confirm(question: str) -> bool:
    """The employee confirms before anything is submitted."""
    return input(f"\n[confirm] {question} [y/N] ").strip().lower() == "y"


def mfa_push(question: str) -> bool:
    """Simulated push to the employee's phone. Only an explicit 'approve' counts."""
    print("\n  +------------- phone -------------+")
    print(f"  | {question}")
    print("  +---------------------------------+")
    return input("  approve / deny: ").strip().lower() == "approve"


def main() -> None:
    parser = argparse.ArgumentParser(description="Helix service desk agent (Claude + ServiceNow agent API)")
    parser.add_argument("--persona", default="sarah", choices=sorted(PERSONAS))
    parser.add_argument("--env", default="demoair", help="reads .env.<env> in the repo root")
    args = parser.parse_args()

    persona = PERSONAS[args.persona]
    run_id = f"demo-{datetime.now(UTC):%Y%m%d-%H%M%SZ}"
    api = AgentApi.from_env_file(REPO_ROOT / f".env.{args.env}", run_id=run_id)
    client = anthropic.Anthropic()

    print(f"Signed in as {persona['name']} ({persona['title']}) on {args.env}. Run ID {run_id}.")
    print("Type your request, or 'exit'.")
    messages: list = []
    while True:
        try:
            prompt = input("\nyou> ").strip()
        except (EOFError, KeyboardInterrupt):
            break
        if prompt.lower() in ("exit", "quit"):
            break
        if not prompt:
            continue
        messages.append({"role": "user", "content": prompt})
        answer = run(client, api, persona, messages, confirm=confirm, mfa_push=mfa_push)
        print(f"\nagent> {answer}")
    print(f"\nBye. Audit rows for this session carry run ID {run_id}.")
