---
name: evidence-bundle
description: Create or validate a concise JSON evidence bundle after a code change. Use when a user asks to record commands, exit codes, changed files, and a result summary for workshop work.
---

# Evidence bundle

Use `references/schema.md` for the required fields.

1. Record only commands that were actually run.
2. Record each real exit code.
3. List only files changed for the task.
4. Write a one-sentence result summary.
5. Run `node scripts/check-evidence.mjs <file>` before presenting the bundle.

Never add secrets, customer data, tokens, or invented evidence.
