"""Read-only readiness check for a ServiceNow instance, before deploying the demo.

Usage (run it yourself; the SDK may ask for your MFA code once):
    python3 tools/inspect_instance.py <sdk-alias> <instance-url>
    python3 tools/inspect_instance.py lab https://<instance>.service-now.com

It gets ONE authenticated session from the SDK (`now-sdk auth --print`), keeps it
in this process only, and prints results. Nothing is written to the instance.

Each check answers a question that cost us time on an earlier instance:
    lab:       flows stayed draft (old IDE); an LLM had never succeeded; Web Automation stole routing
    others:    an install was running; OAuth uploads rejected; third-party scopes refused; AI Agents unlicensed
"""

import json
import os
import pty
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

PLATFORM = Path(__file__).resolve().parent.parent / "platform"


# The SDK prints exactly two session headers. After an MFA prompt the first one
# starts on the same line as the finished prompt, so search anywhere, not per line.
HEADER = re.compile(r"(X-UserToken|Cookie):[ \t]*([^\r\n\x1b]+)")
ANSI = re.compile(r"\x1b\[[0-9;?]*[A-Za-z]")


def session_headers(alias: str) -> dict[str, str]:
    """Ask the SDK for live auth headers. May prompt for MFA.

    The SDK only shows its MFA prompt on a real terminal, so it runs inside a
    pseudo-terminal (pty) and the user answers the prompt as usual. Everything the
    SDK writes is relayed to the screen until the session headers begin: after the
    MFA check mark, or at the first header line, output goes silent.
    """
    captured = bytearray()
    silent = False

    def relay(fd: int) -> bytes:
        """Called with each chunk the SDK writes; returns what the user should see."""
        nonlocal silent
        data = os.read(fd, 1024)
        start = len(captured)
        captured.extend(data)
        if silent:
            return b""
        text = captured.decode(errors="replace")
        cut = [i for i in (text.find("\u2714"), text.find("X-UserToken"), text.find("Cookie:")) if i >= 0]
        if cut:  # show up to the check mark (inclusive) or the first header, then nothing more
            silent = True
            stop = min(cut) + (1 if text[min(cut)] == "\u2714" else 0)
            visible = text[len(captured[:start].decode(errors="replace")):stop]
            return (visible + "\n").encode()
        return data

    previous = os.getcwd()
    os.chdir(PLATFORM)
    try:
        pty.spawn(["npx", "now-sdk", "auth", "--print", alias, "--format", "headers"], relay)
    finally:
        os.chdir(previous)

    clean = ANSI.sub("", captured.decode(errors="replace"))
    headers = {name: value.strip() for name, value in HEADER.findall(clean)}
    if not headers:
        # Show what the SDK actually said, with anything secret-looking blanked out.
        print("\nCould not get a session. The SDK's output was (secrets redacted):", file=sys.stderr)
        text = re.sub(r"\x1b\[[0-9;?]*[A-Za-z]", "", captured.decode(errors="replace"))
        text = re.sub(r"[A-Za-z0-9+/=_.%-]{16,}", "<redacted>", text)
        # Only what came after the MFA check mark matters; the prompt redraws before it are noise.
        after = text.split("✔", 1)[1] if "✔" in text else text
        for line in after.replace("\r", "\n").splitlines():
            if line.strip():
                print("   |", line[:300], file=sys.stderr)
        print(f"   ({len(after)} characters after the check mark)", file=sys.stderr)
        sys.exit("Check the alias with: npx now-sdk auth --list")
    return headers


class Instance:
    def __init__(self, url: str, headers: dict[str, str]) -> None:
        self.url = url.rstrip("/")
        self.headers = {**headers, "Accept": "application/json"}

    def get(self, path: str) -> tuple[int, dict | str]:
        request = urllib.request.Request(self.url + path, headers=self.headers)
        try:
            with urllib.request.urlopen(request, timeout=120) as response:
                text = response.read().decode(errors="replace")
                status = response.status
        except urllib.error.HTTPError as error:
            return error.code, error.read().decode(errors="replace")[:200]
        try:
            return status, json.loads(text)
        except json.JSONDecodeError as error:
            # A 200 can still carry broken JSON: the Table API streams rows and may
            # append an error mid-response. Show the text around the break.
            return status, f"bad JSON at char {error.pos}: {text[max(0, error.pos - 150):error.pos + 300]}"

    def rows(self, table: str, query: str, fields: str, limit: int = 50) -> list[dict] | str:
        qs = urllib.parse.urlencode({"sysparm_query": query, "sysparm_fields": fields,
                                     "sysparm_limit": limit, "sysparm_display_value": "true"})
        status, body = self.get(f"/api/now/table/{table}?{qs}")
        return body["result"] if status == 200 and isinstance(body, dict) else f"HTTP {status}: {body}"

    def count(self, table: str, query: str = "") -> str:
        qs = urllib.parse.urlencode({"sysparm_count": "true", "sysparm_query": query})
        status, body = self.get(f"/api/now/stats/{table}?{qs}")
        return body["result"]["stats"]["count"] if status == 200 and isinstance(body, dict) else f"HTTP {status}: {body}"


def show(value: object) -> str:
    """Display value of a reference/choice field, or the raw value."""
    return value.get("display_value", "") if isinstance(value, dict) else str(value)


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    alias, url = sys.argv[1], sys.argv[2]
    sn = Instance(url, session_headers(alias))

    print(f"\n=== {url} ===")
    me = sn.rows("sys_user", "sys_id=javascript:gs.getUserID()", "user_name", 1)
    print("signed in as:", me[0]["user_name"] if isinstance(me, list) and me else me)

    war = sn.rows("sys_properties", "name=glide.war", "value", 1)
    print("release:", war[0]["value"] if isinstance(war, list) and war else "not readable (check stats.do in a browser)")
    prefix = sn.rows("sys_properties", "name=glide.appcreator.company.code", "value", 1)
    print("vendor prefix:", prefix[0]["value"] if isinstance(prefix, list) and prefix else prefix,
          "(our scopes use x_snc_; a different prefix may be refused as third party)")
    taken = sn.rows("sys_scope", "scopeINx_snc_helix_core,x_snc_helix_agent", "scope", 10)
    print("our scopes already present:", [r["scope"] for r in taken] if isinstance(taken, list) else taken)

    ide = sn.rows("sys_scope", "scope=sn_glider", "version", 1)
    print("ServiceNow IDE:", ide[0]["version"] if isinstance(ide, list) and ide else ide,
          "(3.x could not activate flows; 4.4.4 could)")

    apps = sn.rows("sys_scope", "scopeINsn_aia,sn_generative_ai,sn_uxc_gen_ai,now_assist_core,sn_itsm_aia,sn_naa", "scope,version,active", 20)
    print("AI apps (scope, version, active):")
    for a in apps if isinstance(apps, list) else []:
        print(f"   {a['scope']:18} {a['version'] or '-':10} {a['active']}")

    roles = sn.rows("sys_user_has_role", "user=javascript:gs.getUserID()^role.nameSTARTSWITHsn_aia^state=active", "role", 20)
    print("my AI Agent roles:", [show(r["role"]) for r in roles] if isinstance(roles, list) else roles)
    # A sample is enough to prove read access; 200 rows timed out on a 587-agent instance.
    total, visible = sn.count("sn_aia_agent"), sn.rows("sn_aia_agent", "sys_idISNOTEMPTY", "name", 20)
    n_visible = len(visible) if isinstance(visible, list) else visible
    print(f"AI agents: {total} exist, {n_visible} of a 20-row sample readable by me",
          "(exist but 0 readable = missing role or AI Agents licence)")
    web_automation = sn.rows("sn_aia_usecase", "name=Web Automation", "name", 1)
    print("Web Automation workflow present:", bool(web_automation) if isinstance(web_automation, list) else web_automation,
          "(on the lab it captured access requests)")

    status_counts = sn.get("/api/now/stats/sys_generative_ai_log?sysparm_count=true&sysparm_group_by=status")
    if status_counts[0] == 200 and isinstance(status_counts[1], dict):
        groups = [(g["groupby_fields"][0]["value"], g["stats"]["count"]) for g in status_counts[1]["result"]]
        print("LLM calls by status:", groups or "none ever", "(need at least one 'success')")
    print("agent executions ever:", sn.count("sn_aia_execution_plan"))

    running = sn.rows("sys_execution_tracker", "stateIN0,1^sys_created_on>=javascript:gs.daysAgoStart(2)", "name,state,percent_complete", 20)
    print("installs/jobs running now:", [(show(r["name"])[:50], show(r["percent_complete"])) for r in running]
          if isinstance(running, list) and running else "none")
    print("\nDone. Nothing was changed on the instance.")


if __name__ == "__main__":
    main()
