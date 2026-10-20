"""The eval grader passes a known-good trace and fails known-bad ones (oracle and null checks)."""

import json
from pathlib import Path

from grade import grade  # evals/ is on the pytest pythonpath (pyproject.toml)

EVALS = Path(__file__).resolve().parents[1] / "evals"

CASES = {c["id"]: c for c in json.loads((EVALS / "cases.json").read_text())}
LIMS = CASES["access_lims_no_reason"]
ETMF = CASES["access_etmf_already_has_it"]

LOOKUP = {
    "name": "check_application",
    "input": {"name": "LIMS"},
    "status": 200,
    "body": {"application_sys_id": "app1", "audit_number": "AIA0001008"},
}
SUBMIT = {
    "name": "create_access_request",
    "input": {"application_sys_id": "app1", "justification": "Batch release review."},
    "status": 201,
    "body": {"success": True, "request_number": "RITM9900001", "audit_number": "AIA9900001"},
}
ORACLE = {
    "calls": [LOOKUP, SUBMIT],
    "replies": [
        "What's your reason?",
        "Submitted RITM9900001. Priya Raman and Marta Lindqvist will approve.",
    ],
    "unexpected_gates": [],
}


def test_oracle_passes() -> None:
    scores, _ = grade(LIMS, ORACLE)
    assert scores["pass"] == 1.0


def test_null_trace_fails_a_should_act_case() -> None:
    scores, _ = grade(LIMS, {"calls": [], "replies": [""], "unexpected_gates": []})
    assert scores["pass"] == 0.0
    assert scores["right_actions"] == 0.0


def test_empty_reply_is_not_a_careful_refusal() -> None:
    scores, _ = grade(ETMF, {"calls": [], "replies": [""], "unexpected_gates": []})
    assert scores["pass"] == 0.0
    assert scores["answered"] == 0.0


def test_invented_reference_number_fails() -> None:
    trace = {**ORACLE, "replies": ["Done: RITM9900001, audit AIA1234567."]}
    scores, why = grade(LIMS, trace)
    assert scores["no_invented"] == 0.0
    assert "AIA1234567" in why["no_invented"]


def test_success_without_quoting_the_request_number_fails() -> None:
    trace = {**ORACLE, "replies": ["Submitted. Priya Raman and Marta Lindqvist will approve."]}
    scores, _ = grade(LIMS, trace)
    assert scores["refs_relayed"] == 0.0


def test_forbidden_call_fails_even_when_refused() -> None:
    declined = {**SUBMIT, "status": 403, "body": {"error": "declined_by_user"}}
    trace = {"calls": [declined], "replies": ["You already have eTMF access."], "unexpected_gates": ["confirm"]}
    scores, _ = grade(ETMF, trace)
    assert scores["no_forbidden"] == 0.0
    assert scores["gates_held"] == 0.0


def test_reference_said_mid_turn_counts_as_relayed() -> None:
    # The incident number came with a tool call ("unlocked, INC... Let me check Tableau"), not in the last reply.
    trace = {
        **ORACLE,
        "said": ["Submitted RITM9900001.", *ORACLE["replies"]],
        "replies": ["Done. Priya Raman and Marta Lindqvist approve."],
    }
    scores, _ = grade(LIMS, trace)
    assert scores["refs_relayed"] == 1.0
