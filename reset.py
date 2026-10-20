"""Put the demo back in its start state so a scenario can be run again.

Usage:
    SN_ENV=demoair python3 reset.py

Uses the admin login from .env.<name>, like deploy.py. The agent's own user
cannot do this, by design: resetting the demo is an operator job.
"""

import os
import sys
import urllib.parse

from deploy import ALLOWED_ENVS, call_api

# user_name -> fields that make up its demo start state (see platform/src/fluent/demo-data/users.now.ts)
START_STATE = {"helix.sarah.chen": {"locked_out": "true"}}


def main() -> None:
    env_name = os.environ.get("SN_ENV", "")
    if env_name not in ALLOWED_ENVS:
        sys.exit(
            f"Set SN_ENV to one of {ALLOWED_ENVS}, for example: SN_ENV=demoair python3 reset.py"
        )

    for user_name, fields in START_STATE.items():
        query = urllib.parse.urlencode(
            {"sysparm_query": f"user_name={user_name}", "sysparm_fields": "sys_id"}
        )
        status, body = call_api(env_name, "GET", f"/api/now/table/sys_user?{query}")
        if status != 200 or not body.get("result"):
            sys.exit(f"Could not find {user_name} (HTTP {status}).")
        sys_id = body["result"][0]["sys_id"]

        status, body = call_api(
            env_name,
            "PATCH",
            f"/api/now/table/sys_user/{sys_id}?sysparm_fields=user_name,locked_out",
            fields,
        )
        if status != 200:
            sys.exit(f"Reset of {user_name} failed with HTTP {status}: {body}")
        print(f"  {user_name}: {body['result']}")

    print(f"\nReset OK on '{env_name}'.")


if __name__ == "__main__":
    main()
