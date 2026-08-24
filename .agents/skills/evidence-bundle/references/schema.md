# Evidence schema

Required JSON fields:

- `command`: non-empty string
- `exitCode`: integer
- `changedFiles`: array of repository-relative paths
- `summary`: non-empty string

The bundle records observed facts. It is not a narrative report.
