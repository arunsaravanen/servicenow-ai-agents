"""The host's gates hold without any model call: write routes run only after a human says yes."""

from dataclasses import dataclass, field

import pytest

from host.agent import CONFIRMED_BY, MFA_APPROVED, MFA_DENIED, PERSONAS, TOOLS, execute_tool

SARAH = PERSONAS["sarah"]
HOST_OWNED = {"user_sys_id", "mfa_attestation", "confirmed_by"}


@dataclass
class FakeApi:
    """Stands in for AgentApi and records every call instead of touching ServiceNow."""

    run_type: str = "demo"
    calls: list = field(default_factory=list)
    apps: dict = field(default_factory=dict)

    def application(self, name: str) -> tuple[int, dict]:
        return 200, {
            "application_sys_id": "app1",
            "application": "LIMS Reporting Tool",
            "gxp_classification": "validated",
        }

    def unlock(self, user_sys_id: str, mfa_attestation: str) -> tuple[int, dict]:
        self.calls.append(("unlock", user_sys_id, mfa_attestation))
        return 200, {"success": True}

    def access_request(
        self, user_sys_id: str, application_sys_id: str, justification: str, confirmed_by: str
    ) -> tuple[int, dict]:
        self.calls.append(("access_request", user_sys_id, application_sys_id, justification, confirmed_by))
        return 201, {"success": True}


def yes(question: str) -> bool:
    return True


def no(question: str) -> bool:
    return False


def test_unlock_without_mfa_approval_sends_only_a_denial() -> None:
    # The platform must see the refused attempt (it audits it), but never an approval.
    api = FakeApi()
    execute_tool(api, SARAH, "unlock_account", {}, confirm=yes, mfa_push=no)
    assert api.calls == [("unlock", SARAH["sys_id"], MFA_DENIED)]
    assert MFA_DENIED != MFA_APPROVED


def test_unlock_after_mfa_approval_sends_host_owned_values() -> None:
    api = FakeApi()
    status, _ = execute_tool(api, SARAH, "unlock_account", {}, confirm=no, mfa_push=yes)
    assert status == 200
    assert api.calls == [("unlock", SARAH["sys_id"], MFA_APPROVED)]


def looked_up(api: FakeApi) -> FakeApi:
    execute_tool(api, SARAH, "check_application", {"name": "LIMS"}, confirm=no, mfa_push=no)
    return api


def test_access_request_without_confirmation_never_calls_the_api() -> None:
    api = looked_up(FakeApi())
    tool_input = {"application_sys_id": "app1", "justification": "Stability study review."}
    status, body = execute_tool(api, SARAH, "create_access_request", tool_input, confirm=no, mfa_push=yes)
    assert (status, body["error"]) == (403, "declined_by_user")
    assert api.calls == []


@pytest.mark.parametrize("run_type", ["demo", "eval"])
def test_confirmed_access_request_records_who_confirmed(run_type: str) -> None:
    api = looked_up(FakeApi(run_type=run_type))
    tool_input = {"application_sys_id": "app1", "justification": "Stability study review."}
    status, _ = execute_tool(api, SARAH, "create_access_request", tool_input, confirm=yes, mfa_push=no)
    assert status == 201
    assert api.calls == [("access_request", SARAH["sys_id"], "app1", "Stability study review.", CONFIRMED_BY[run_type])]


def test_access_request_for_an_app_not_looked_up_is_refused_before_asking() -> None:
    # A swapped sys_id (prompt injection or model error) never reaches the human or the platform.
    api = looked_up(FakeApi())
    asked = []
    tool_input = {"application_sys_id": "other", "justification": "Stability study review."}
    status, body = execute_tool(api, SARAH, "create_access_request", tool_input, confirm=asked.append, mfa_push=no)
    assert (status, body["error"]) == (400, "unknown_application")
    assert asked == [] and api.calls == []


def test_confirmation_names_the_application_and_its_gxp_class() -> None:
    api = looked_up(FakeApi())
    asked = []
    tool_input = {"application_sys_id": "app1", "justification": "Stability study review."}
    execute_tool(api, SARAH, "create_access_request", tool_input, confirm=asked.append, mfa_push=no)
    assert "LIMS Reporting Tool" in asked[0] and "validated" in asked[0]


def test_unknown_tool_is_an_error_not_a_call() -> None:
    api = FakeApi()
    status, body = execute_tool(api, SARAH, "provision_access", {}, confirm=yes, mfa_push=yes)
    assert (status, body["error"]) == (400, "unknown_tool")
    assert api.calls == []


@pytest.mark.parametrize("tool", TOOLS, ids=[t["name"] for t in TOOLS])
def test_model_cannot_supply_host_owned_values(tool: dict) -> None:
    schema = tool["input_schema"]
    assert tool["strict"] is True
    assert schema["additionalProperties"] is False
    assert HOST_OWNED.isdisjoint(schema["properties"])
