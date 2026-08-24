import test from "node:test";
import assert from "node:assert/strict";
import { evaluateRelease } from "../src/release-policy.mjs";

test("reports all blockers", () => {
  assert.deepEqual(evaluateRelease({ checks: { tests: "failed", security: "pending", change: "approved" } }).blockers.map(({ key }) => key), ["tests", "security", "rollback"]);
});

test("accepts complete evidence", () => {
  assert.equal(evaluateRelease({ checks: { tests: "passed", security: "passed", change: "approved", rollback: "ready" } }).decision, "ready");
});
