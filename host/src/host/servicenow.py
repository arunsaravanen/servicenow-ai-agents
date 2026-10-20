"""Thin client for the Helix agent API: the host's only door into ServiceNow.

One method per route. Each returns (HTTP status, JSON body) and never raises on
4xx/5xx, because the agent loop hands errors back to the model as tool results.
"""

import base64
import json
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path

API = "/api/x_snc_helix_core/agent"


def load_env_file(path: Path) -> dict[str, str]:
    """Read KEY=value lines. Values are never printed."""
    env: dict[str, str] = {}
    for line in path.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            env[key.strip()] = value.strip()
    return env


@dataclass(frozen=True)  # frozen: fields cannot be reassigned after creation
class AgentApi:
    base_url: str
    authorization: str
    run_id: str
    run_type: str = "demo"  # "demo" or "eval"; recorded on every audit row
    apps: dict = field(default_factory=dict)  # check_application results by sys_id, kept by the host

    @classmethod
    def from_env_file(cls, path: Path, run_id: str, run_type: str = "demo") -> "AgentApi":
        env = load_env_file(path)
        if not env["SN_INSTANCE"].startswith("https://"):
            raise ValueError("SN_INSTANCE must start with https:// (Basic auth would be sent in clear text)")
        user, password = env["SN_AGENT_USER"], env["SN_AGENT_PASSWORD"]
        token = base64.b64encode(f"{user}:{password}".encode()).decode()
        return cls(env["SN_INSTANCE"].rstrip("/"), f"Basic {token}", run_id, run_type)

    def _request(self, method: str, path: str, query: dict | None = None, body: dict | None = None) -> tuple[int, dict]:
        url = self.base_url + API + path
        if query:
            url += "?" + urllib.parse.urlencode(query)
        request = urllib.request.Request(
            url,
            method=method,
            data=json.dumps(body).encode() if body is not None else None,
            headers={
                "Authorization": self.authorization,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=120) as response:
                status, text = response.status, response.read().decode(errors="replace")
        except urllib.error.HTTPError as error:
            status, text = error.code, error.read().decode(errors="replace")
        try:
            payload = json.loads(text)
        except json.JSONDecodeError:
            return status, {"error": "bad_json", "detail": text[:300]}
        # Scripted REST wraps successful bodies in {"result": ...}; errors are not wrapped.
        return status, payload.get("result", payload) if isinstance(payload, dict) else {"result": payload}

    def _run(self) -> dict[str, str]:
        return {"run_id": self.run_id, "run_type": self.run_type}

    def application(self, name: str) -> tuple[int, dict]:
        query = {"name": name, **self._run()}
        return self._request("GET", "/application", query=query)

    def entitlements(self, user_sys_id: str, application_sys_id: str) -> tuple[int, dict]:
        query = {"user_sys_id": user_sys_id, "application_sys_id": application_sys_id, **self._run()}
        return self._request("GET", "/entitlements", query=query)

    def unlock(self, user_sys_id: str, mfa_attestation: str) -> tuple[int, dict]:
        body = {"user_sys_id": user_sys_id, "mfa_attestation": mfa_attestation, **self._run()}
        return self._request("POST", "/unlock", body=body)

    def access_request(
        self, user_sys_id: str, application_sys_id: str, justification: str, confirmed_by: str
    ) -> tuple[int, dict]:
        body = {
            "user_sys_id": user_sys_id,
            "application_sys_id": application_sys_id,
            "justification": justification,
            "confirmed_by": confirmed_by,
            **self._run(),
        }
        return self._request("POST", "/access_request", body=body)
