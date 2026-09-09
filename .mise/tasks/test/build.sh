#!/usr/bin/env bash
#MISE description="Fail when a committed stylesheet no longer matches the sources it is built from"
#MISE dir="{{config_root}}"
set -euo pipefail

# theme.css and the snippets are committed because Obsidian installs them
# directly, so they are the files that can quietly stop matching their sources.
SHEETS=(
  "src/base.scss:theme.css"
  "snippets/src/custom-rainbow-colors.scss:snippets/custom-rainbow-colors.css"
  "snippets/src/extended-colorschemes.scss:snippets/extended-colorschemes.css"
  "snippets/src/floating-search-bar.scss:snippets/floating-search-bar.css"
  "snippets/src/its-frontmatter.scss:snippets/its-frontmatter.css"
  "snippets/src/notion-cards.scss:snippets/notion-cards.css"
)

main() {
  local work stale=0
  work=$(mktemp -d)
  # shellcheck disable=SC2064  # expand now: the path must survive the function.
  trap "rm -rf '${work}'" EXIT

  for pair in "${SHEETS[@]}"; do
    local source="${pair%%:*}" committed="${pair##*:}" built
    built="${work}/$(basename "${committed}")"
    node_modules/.bin/sass "${source}" "${built}" --no-source-map --style=expanded --quiet

    if ! diff -q "${built}" "${committed}" > /dev/null; then
      echo "${committed} does not match ${source}" >&2
      diff -u "${committed}" "${built}" | head -20 >&2
      stale=1
    fi
  done

  if [[ ${stale} -eq 1 ]]; then
    echo "Run: mise run build" >&2
    exit 1
  fi
  echo "Build: ${#SHEETS[@]} stylesheets, each matching the sources it is built from."
}

main "$@"
