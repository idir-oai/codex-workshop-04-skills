import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateEvidence } from "../.agents/skills/evidence-bundle/scripts/check-evidence.mjs";

test("accepts a complete evidence bundle", async () => {
  const fixture = JSON.parse(await readFile(new URL("../fixtures/valid-evidence.json", import.meta.url)));
  assert.deepEqual(validateEvidence(fixture), []);
});

test("rejects invented or incomplete structure", () => {
  assert.deepEqual(validateEvidence({ command: "", exitCode: "zero" }), [
    "command is required",
    "exitCode must be an integer",
    "changedFiles must be a string array",
    "summary is required"
  ]);
});

