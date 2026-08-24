import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderHandoff, validateRun } from "../.agents/skills/evidence-bundle/scripts/build-evidence.mjs";

test("renders a reviewer handoff from observed evidence", async () => {
  const record = JSON.parse(await readFile(new URL("../artifacts/run-record.json", import.meta.url)));
  const output = renderHandoff(record);
  assert.match(output, /\*\*Status:\*\* complete/);
  assert.match(output, /node --test test\/release-policy\.test\.mjs/);
  assert.match(output, /## Rollback/);
});

test("rejects records without a boundary check", () => {
  const record = { status: "complete", outcome: "Done", changes: [{ file: "src/a.mjs", symbols: ["a"] }], checks: [{ kind: "positive", command: "npm test", exitCode: 0, output: "pass" }], risk: "None known", rollback: "Revert", nextAction: "Review" };
  assert.deepEqual(validateRun(record), ["a boundary check is required"]);
});
