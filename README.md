# Evidence skill in a real change workflow

The repository contains a release-policy change, tests, a captured run record, and a project-scoped skill that produces a reviewer handoff from observed evidence.

Invoke `$evidence-bundle` after running the tests. The skill validates `artifacts/run-record.json` and renders the same structure as `examples/reviewer-handoff.md`.

```bash
npm test
npm run evidence
```
Synthetic starter repository for the Codex skills workshop lab
