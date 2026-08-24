---
name: evidence-bundle
description: Build a reviewer-ready engineering handoff from observed change and validation records. Use after implementation is complete; do not use for plans, progress updates, or unverified completion claims.
---

# Evidence bundle

Read `references/evidence-contract.md`. Use `assets/handoff-template.md` as the output structure.

1. Confirm the underlying change is complete or explicitly blocked.
2. Read the observed run record. Never invent commands, output, or exit codes.
3. Require one positive check and one negative or boundary check.
4. Run `node scripts/build-evidence.mjs <run-record.json>`.
5. Return the rendered handoff and identify any residual risk.

Stop when required evidence is missing. This skill packages evidence; it does not create proof retroactively.
