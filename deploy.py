"""Build, install and publish the Fluent app, then verify every flow is live.

Usage:
    SN_ENV=lab python3 deploy.py            # core app (platform/)
    SN_ENV=lab python3 deploy.py studio     # Studio agent (studio/)
    SN_ENV=demoair python3 deploy.py

Why this exists: `now-sdk install` leaves flows in draft on instances whose
ServiceNow IDE lacks the activation endpoint, and the platform keeps running
the last *published* version. A changed flow would silently run old logic.
This script publishes after every install and fails loudly if any flow is
not published and active.

Credentials: admin credentials from .env.<name>.
"""

import base64
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ALLOWED_ENVS = ("lab", "demoair")
# project name -> (source folder, app scope, environments it may be deployed to)
PROJECTS = {
    "platform": ("platform", "x_snc_helix_core", ("lab", "demoair")),
    "studio": ("studio", "x_snc_helix_agent", ("lab", "demoair")),
}


def load_env(name: str) -> dict[str, str]:
    """Read KEY=value lines from .env.<name>. Values are never printed."""
    path = ROOT / f".env.{name}"
    if not path.exists():
        sys.exit(f"Missing {path.name}. Create it from .env.example.")
    env: dict[str, str] = {}
    for line in path.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            env[key.strip()] = value.strip()
    return env


def connection(env_name: str) -> tuple[str, str]:
    """Return (instance URL, Authorization header value) for an environment."""
    env = load_env(env_name)
    if not env["SN_INSTANCE"].startswith("https://"):
        sys.exit("SN_INSTANCE must start with https:// (Basic auth would be sent in clear text)")
    basic = base64.b64encode(f"{env['SN_USER']}:{env['SN_PASSWORD']}".encode()).decode()
    return env["SN_INSTANCE"].rstrip("/"), f"Basic {basic}"


def call_api(env_name: str, method: str, path: str, body: dict | None = None) -> tuple[int, dict]:
    """Call the instance as admin using the env file credentials."""
    base_url, authorization = connection(env_name)
    request = urllib.request.Request(
        base_url + path,
        method=method,
        data=json.dumps(body or {}).encode(),
        headers={
            "Authorization": authorization,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            return response.status, json.load(response)
    except urllib.error.HTTPError as error:
        return error.code, {"error": error.read().decode(errors="replace")[:500]}


def run(command: list[str], cwd: Path) -> None:
    """Run a command in the project folder and stop the deploy if it fails."""
    print(f"\n$ {' '.join(command)}")
    subprocess.run(command, cwd=cwd, check=True)


def main() -> None:
    env_name = os.environ.get("SN_ENV", "")
    if env_name not in ALLOWED_ENVS:
        sys.exit(f"Set SN_ENV to one of {ALLOWED_ENVS}, for example: SN_ENV=lab python3 deploy.py")
    project = sys.argv[1] if len(sys.argv) > 1 else "platform"
    if project not in PROJECTS:
        sys.exit(f"Unknown project '{project}'. Choose one of {tuple(PROJECTS)}.")
    folder, scope, allowed_envs = PROJECTS[project]
    if env_name not in allowed_envs:
        sys.exit(f"Project '{project}' may only be deployed to {allowed_envs}, not '{env_name}'.")
    cwd = ROOT / folder

    run(["npm", "run", "build"], cwd)
    run(["npx", "now-sdk", "install", "--auth", env_name], cwd)

    print(f"\nPublishing flows in {scope}...")
    status, body = call_api(env_name, "POST", "/api/x_snc_helix_core/ops/publish_flows", {"scope": scope})
    if status != 200:
        sys.exit(f"Publish call failed with HTTP {status}: {body}")

    flows = body["result"]["flows"]
    for flow in flows:
        print(f"  {flow['status']:<10} active={flow['active']:<5} {flow['type']:<8} {flow['name']}  ({flow['outcome']})")

    # GlideRecord.getValue returns booleans as "1"/"0".
    not_live = [f for f in flows if f["status"] != "published" or f["active"] not in ("1", "true")]
    if not_live:
        sys.exit(f"\nDEPLOY FAILED: {len(not_live)} flow(s) not published and active. The platform may be running stale logic.")
    print(f"\nDeploy OK: {project} on '{env_name}', {len(flows)} flows published and active.")


if __name__ == "__main__":
    main()
