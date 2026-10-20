# Build notes

What building this on real ServiceNow instances taught me, and the decisions that came out of it.
Instance names, record numbers and dates are left out on purpose.

## How instances are handled

- The git repo is the source of truth. Instances only receive installs from it
  (`now-sdk install --auth <alias>`). Nothing is pulled back from any instance.
- Scopes: core `x_snc_helix_core`, Studio `x_snc_helix_agent`. They carry the vendor prefix because
  some instances refuse "third party" apps whose scope lacks it.
- SDK: `@servicenow/sdk` 4.13.0.
- Python scripts read `.env.<alias>` selected by `SN_ENV`. All `.env.*` files are git-ignored. SDK logins
  are stored by `now-sdk auth` under aliases, always passed explicitly with `--auth <alias>`.

## Lessons

- **Flows can install as draft and keep running old logic.** On an older ServiceNow IDE, `now-sdk install`
  left flows in draft while the platform kept running the last published version, so a changed flow would
  silently run old logic. `deploy.py` therefore publishes every flow through an admin-only route
  (`/api/x_snc_helix_core/ops/publish_flows`, FlowAPI.publish) and fails unless each flow is published and
  active.
- **Check instance health before blaming your own agent.** Thousands of `sys_generative_ai_log` errors on one
  instance came from a background job, not from agent runs. `tools/inspect_instance.py` now checks release,
  IDE version, AI Agent Studio and recent LLM success before any deploy.
- **Routing in the Now Assist panel is a governance decision, not a bug to patch.** On shared instances the
  panel's router sent access requests to an out-of-box workflow. Deactivating out-of-box records did not
  change the routing, so both changes were reverted. Which agents an audience can reach is decided by the
  instance owner, and routing cases belong in the eval set. The Studio variant is demonstrated from
  AI Agent Studio > Testing, where it works end to end.
- **Verify outcomes through the Table API, not the chat reply.** Every end-to-end test was checked on the
  records themselves: the requested item, its approvals and the running approval flow for a GxP request;
  the audit rows, the resolved incident and the cleared lockout for an unlock.
- **Record numbers are not unique.** On one instance three incidents shared a number. The agent API returns
  `incident_sys_id` so records are opened by link, not by searching a number.

## Verified behaviour

- **Studio, GxP access.** "I need access to LIMS": the agent looked up the user, checked entitlements and the
  application (GxP `validated`), asked for a business justification and a confirmation, then filed the
  request. Approvals went to the system owner and Quality.
- **Claude host, unlock.** "I'm locked out": MFA push denied, then approved on retry. The denied attempt was
  refused by the platform with nothing changed and still audited; the approved one unlocked the account and
  resolved an incident whose close notes name the (simulated) MFA.
- **Least privilege.** The integration user `helix.agent.host` is web-service only and holds one role:
  200 on the agent routes, 401 without credentials, 403 on the plain Table API.
- **Evals.** See the README. Eval runs record writes instead of sending them, so they file nothing.

## Open findings

- **`opened_by` is `system` on Studio requests.** The agent runs as the requester (dynamic user) and
  `requested_for` is correct, but `opened_by` is the system account. For a GxP audit trail that matters.
- **`stage` shows "Request Approved" while `approval` is "Requested".** The out-of-box stage field on a catalog
  item without stage configuration. Cosmetic, but misleading in a demo.
- **Large AI tables are slow.** With hundreds of agents on an instance, some Studio pages and REST reads time
  out or take seconds. Allow for latency.
