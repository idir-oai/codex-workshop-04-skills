# Evidence contract

The input JSON requires:

- `outcome`: concrete result.
- `status`: `complete` or `blocked`.
- `changes`: files and important symbols.
- `checks`: commands with observed integer exit codes and a `positive` or `boundary` kind.
- `risk`: remaining uncertainty.
- `rollback`: exact local reversal.
- `nextAction`: one reviewer action.

Reject records with no boundary check, non-zero exit codes marked as passed, empty changed files, or claims unsupported by command output.
