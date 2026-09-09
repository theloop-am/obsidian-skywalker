#!/usr/bin/env bash
#MISE description="Build and copy into a vault — VAULT=/path/to/vault mise run theme:install"
#MISE dir="{{config_root}}"
#MISE depends=["build"]
set -euo pipefail

main() {
  if [[ -z "${VAULT:-}" ]]; then
    echo "VAULT is unset" >&2
    exit 1
  fi

  local name
  name=$(node -p 'require("./manifest.json").name')
  local target="${VAULT}/.obsidian/themes/${name}"
  mkdir -p "${target}"
  cp theme.css manifest.json "${target}/"
  echo "installed into ${target}"
}

main "$@"
