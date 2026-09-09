#!/usr/bin/env bash
#MISE description="Compile src/ into theme.css, which is what Obsidian loads"
#MISE dir="{{config_root}}"
set -euo pipefail

# package.json owns the command: the community directory builds nothing, but a
# contributor without mise still needs one way to produce the file.
exec npm run --silent build
