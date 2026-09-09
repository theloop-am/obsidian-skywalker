#!/usr/bin/env bash
#MISE description="theme.css and the snippets, under the ruleset the directory scans with"
#MISE dir="{{config_root}}"
set -euo pipefail

# Warnings here are the directory's own advice - !important, :has(), features the
# engine does not carry - so they are reported rather than fatal. What is fatal
# lives in test:assets, because that one is a rule and not advice.
exec stylelint theme.css "snippets/*.css" "$@"
