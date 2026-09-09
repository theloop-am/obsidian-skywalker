#!/usr/bin/env bash
#MISE description="Stylelint over the SCSS sources, under the modern SCSS ruleset"
#MISE dir="{{config_root}}"
set -euo pipefail

exec node_modules/.bin/stylelint --config .stylelintrc.scss.json "src/**/*.scss" "snippets/src/**/*.scss" "$@"
