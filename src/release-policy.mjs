const required = { tests: "passed", security: "passed", change: "approved", rollback: "ready" };

export function evaluateRelease(release) {
  const blockers = Object.entries(required)
    .filter(([key, expected]) => release.checks?.[key] !== expected)
    .map(([key, expected]) => ({ key, expected, actual: release.checks?.[key] ?? "missing" }));
  return { decision: blockers.length ? "blocked" : "ready", blockers };
}
