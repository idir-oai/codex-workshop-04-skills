# Reviewer handoff

**Status:** complete

## Outcome

Approval policy reports every missing release check in one decision.

## Changes

- `src/release-policy.mjs`: `evaluateRelease`
- `test/release-policy.test.mjs`: policy and boundary coverage

## Verification

- Positive: focused policy tests pass.
- Boundary: incomplete evidence records are rejected.

## Residual risk

Transport mapping is outside this change.

## Rollback

Revert the policy and its tests together.

## Reviewer action

Confirm blocker ordering is suitable for the API contract.
