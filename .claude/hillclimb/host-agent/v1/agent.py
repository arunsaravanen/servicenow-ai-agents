"""The Helix service desk agent: Claude plus four tools backed by the agent API.

Each tool schema holds only what the model may decide. Who is asking, the MFA
attestation and the human confirmation are added by the host, never the model.
"""

import json
from collections.abc import Callable

import anthropic

from host.servicenow import AgentApi

MODEL = "claude-opus-5"
# Server-side refusal fallback: a declined request is retried on Anthropic's
# recommended fallback model inside the same call instead of just stopping.
FALLBACK_BETA = "server-side-fallback-2026-07-01"


def _tool(name: str, description: str, properties: dict) -> dict:
    """strict: the API rejects any argument not in the schema."""
    return {
        "name": name,
        "description": description,
        "strict": True,
        "input_schema": {
            "type": "object",
            "properties": properties,
            "required": list(properties),
            "additionalProperties": False,
        },
    }


TOOLS = [
    _tool(
        "check_application",
        "Look up a Helix business application by its short name (for example LIMS or Tableau). "
        "Returns its sys_id, GxP classification and the approvers an access request would go to.",
        {"name": {"type": "string", "description": "Short application name as the user said it."}},
    ),
    _tool(
        "check_entitlements",
        "Check whether the person asking already has access to an application. Call check_application first.",
        {"application_sys_id": {"type": "string", "description": "sys_id returned by check_application."}},
    ),
    _tool(
        "create_access_request",
        "Submit an access request for the person asking. The host asks them to confirm before it is sent. "
        "Routing and approvers follow the application's GxP classification. Never provisions access.",
        {
            "application_sys_id": {"type": "string", "description": "sys_id returned by check_application."},
            "justification": {"type": "string", "description": "One-sentence business reason from the user."},
        },
    ),
    _tool(
        "unlock_account",
        "Unlock the account of the person asking when they are locked out. The host sends them an MFA push "
        "and only proceeds if they approve it. Takes no input.",
        {},
    ),
]

SYSTEM = """You are the Helix IT service desk agent. You help one employee, named below, with account \
lockouts and application access.

Rules:
- You can only act through your tools. Never claim an action happened unless a tool result says so.
- Access requests: check the application, then existing access, then ask for a one-sentence business \
justification if the user has not given one, then call create_access_request. Tell the user who approves.
- Lockouts: call unlock_account. Identity is verified by an MFA push the host sends, not by you. When you \
call it, say only: "I'm sending an MFA push to your phone. Please approve it to continue."
- Report outcomes from tool results only, in two or three sentences: what happened and the reference \
numbers the result gives you (incident, request, audit). If something failed, do not list possible causes \
or troubleshooting steps; offer to try again.
- You are the service desk. If you cannot help, say a human colleague on the service desk will follow up; \
do not tell the employee to contact the service desk.
- You never provision access and never bypass an approval. If asked to, explain that humans decide.
- create_access_request files one kind of request: standard access for the employee to an application they \
do not have yet. It cannot ask for admin or other elevated roles, and it cannot file for anyone else. For \
those, and when the employee already has access, do not call it: say a human colleague on the service desk \
will follow up.

Employee: {name}, {title}."""


# Who is asking. The host decides this (in a real deployment: the signed-in user), never the model.
# sys_ids are fixed by the core app's Fluent keys, so they are the same on every instance.
PERSONAS = {
    "sarah": {
        "sys_id": "f55f2b62e2194ce6815dce9725a81c4c",
        "name": "Sarah Chen",
        "title": "Clinical Research Associate",
    },
}

# Values the platform's gates accept. Only the host ever sends them.
MFA_APPROVED = "approved_simulated"  # unlock_account subflow condition
MFA_DENIED = "denied"  # anything else is refused and audited as rejected
CONFIRMED_BY = {"demo": "human_presenter", "eval": "eval_harness"}  # create_access_request condition

Gate = Callable[[str], bool]  # shows a question to a human, returns their yes/no


def call_model(
    client: anthropic.Anthropic, persona: dict, messages: list, model: str = MODEL
) -> anthropic.types.beta.BetaMessage:
    return client.beta.messages.create(
        model=model,
        max_tokens=16000,
        betas=[FALLBACK_BETA],
        fallbacks="default",
        system=SYSTEM.format(**persona),
        tools=TOOLS,
        messages=messages,
    )


def execute_tool(
    api: AgentApi, persona: dict, name: str, tool_input: dict, confirm: Gate, mfa_push: Gate
) -> tuple[int, dict]:
    """Run one tool the model asked for. Host-owned values are added here."""
    user = persona["sys_id"]
    if name == "check_application":
        return api.application(tool_input["name"])
    if name == "check_entitlements":
        return api.entitlements(user, tool_input["application_sys_id"])
    if name == "create_access_request":
        if not confirm(f"Submit an access request for {persona['name']}? Reason: {tool_input['justification']}"):
            return 403, {"error": "declined_by_user", "detail": "The employee did not confirm. Nothing was submitted."}
        return api.access_request(
            user, tool_input["application_sys_id"], tool_input["justification"], CONFIRMED_BY[api.run_type]
        )
    if name == "unlock_account":
        # A denied push still goes to the platform: it refuses the unlock and records the attempt.
        approved = mfa_push(f"MFA push to {persona['name']}: approve sign-in to unlock your account?")
        return api.unlock(user, MFA_APPROVED if approved else MFA_DENIED)
    return 400, {"error": "unknown_tool", "detail": name}


def run(
    client: anthropic.Anthropic,
    api: AgentApi,
    persona: dict,
    messages: list,
    confirm: Gate,
    mfa_push: Gate,
    max_turns: int = 10,
    model: str = MODEL,
    on_response: Callable[[anthropic.types.beta.BetaMessage], None] | None = None,
    log: Callable[[str], None] = print,
) -> str:
    """The agent loop for one user turn: call Claude, run the tools it asks for, repeat until it answers.

    messages is the whole conversation so far, ending with the user's latest message. It is
    extended in place, so the caller can keep the conversation going on the next turn.
    on_response sees every model response (the eval records usage and the served model from it).
    """
    for _ in range(max_turns):
        response = call_model(client, persona, messages, model)
        if on_response:
            on_response(response)
        # Append the full content (text, tool_use and any thinking blocks), not just the text.
        messages.append({"role": "assistant", "content": response.content})
        text = "\n".join(b.text for b in response.content if b.type == "text")

        if response.stop_reason == "refusal":
            return "The request was declined by the model's safety checks."
        if response.stop_reason != "tool_use":
            return text
        if text:
            log(f"[claude] {text}")

        results = []
        for block in response.content:
            if block.type != "tool_use":
                continue
            status, body = execute_tool(api, persona, block.name, block.input, confirm, mfa_push)
            log(f"[tool]   {block.name}({json.dumps(block.input)}) -> {status} {json.dumps(body)[:200]}")
            results.append(
                {
                    "type": "tool_result",
                    "tool_use_id": block.id,  # must match the request it answers
                    "content": json.dumps({"status": status, **body}),
                    "is_error": status >= 400,
                }
            )
        # All results for this turn go back in one user message.
        messages.append({"role": "user", "content": results})
    return f"Stopped after {max_turns} turns without an answer."
