import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export function validateRun(record) {
  const errors = [];
  if (!record || !["complete", "blocked"].includes(record.status)) errors.push("status must be complete or blocked");
  if (typeof record?.outcome !== "string" || !record.outcome.trim()) errors.push("outcome is required");
  if (!Array.isArray(record?.changes) || !record.changes.length || record.changes.some(({ file, symbols }) => !file || !Array.isArray(symbols))) errors.push("changes require files and symbols");
  if (!Array.isArray(record?.checks) || !record.checks.length) errors.push("checks are required");
  else {
    if (!record.checks.some(({ kind }) => kind === "positive")) errors.push("a positive check is required");
    if (!record.checks.some(({ kind }) => kind === "boundary")) errors.push("a boundary check is required");
    if (record.checks.some(({ command, exitCode, output }) => !command || !Number.isInteger(exitCode) || typeof output !== "string")) errors.push("checks require command, integer exitCode, and output");
  }
  for (const field of ["risk", "rollback", "nextAction"]) if (typeof record?.[field] !== "string" || !record[field].trim()) errors.push(`${field} is required`);
  return errors;
}

export function renderHandoff(record) {
  const errors = validateRun(record);
  if (errors.length) throw new Error(errors.join("; "));
  const changes = record.changes.map(({ file, symbols }) => `- \`${file}\`: ${symbols.join(", ")}`).join("\n");
  const checks = record.checks.map(({ kind, command, exitCode, output }) => `- **${kind}** \`${command}\` → ${exitCode}\n  ${output}`).join("\n");
  return `# Reviewer handoff\n\n**Status:** ${record.status}\n\n## Outcome\n\n${record.outcome}\n\n## Changes\n\n${changes}\n\n## Verification\n\n${checks}\n\n## Residual risk\n\n${record.risk}\n\n## Rollback\n\n${record.rollback}\n\n## Reviewer action\n\n${record.nextAction}\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const record = JSON.parse(await readFile(process.argv[2], "utf8"));
  console.log(renderHandoff(record));
}
