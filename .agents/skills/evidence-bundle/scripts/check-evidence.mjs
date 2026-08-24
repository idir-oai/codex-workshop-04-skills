import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export function validateEvidence(value) {
  const errors = [];
  if (typeof value?.command !== "string" || !value.command.trim()) errors.push("command is required");
  if (!Number.isInteger(value?.exitCode)) errors.push("exitCode must be an integer");
  if (!Array.isArray(value?.changedFiles) || value.changedFiles.some((file) => typeof file !== "string")) errors.push("changedFiles must be a string array");
  if (typeof value?.summary !== "string" || !value.summary.trim()) errors.push("summary is required");
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = process.argv[2];
  if (!file) throw new Error("Usage: node check-evidence.mjs <file>");
  const errors = validateEvidence(JSON.parse(await readFile(file, "utf8")));
  if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
  else console.log("Evidence bundle is valid.");
}
