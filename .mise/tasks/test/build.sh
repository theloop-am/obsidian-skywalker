#!/usr/bin/env bash
#MISE description="Fail when theme.css no longer matches the sources it is built from"
#MISE dir="{{config_root}}"
set -euo pipefail

# theme.css is committed because Obsidian installs it directly, so it is the one
# file that can quietly stop matching src/.
main() {
  local built
  built=$(mktemp)
  # shellcheck disable=SC2064  # expand now: the path must survive the function.
  trap "rm -f '${built}'" EXIT

  node_modules/.bin/sass src/base.scss "${built}" --no-source-map --style=expanded --quiet

  if diff -q "${built}" theme.css > /dev/null; then
    echo "Build: theme.css matches the sources it is built from."
    return 0
  fi

  echo "theme.css does not match src/. Run: mise run build" >&2
  diff -u theme.css "${built}" | head -40 >&2
  exit 1
}

main "$@"
