#!/usr/bin/env bash
#MISE description="theme.css and the snippets, under the ruleset the directory scans with"
#MISE dir="{{config_root}}"
set -euo pipefail

# The directory's scanner reports its findings as warnings and passes the job
# anyway, so the verdict ends up in a log nobody reads. Here a warning is a
# failure. What the built stylesheet cannot carry - the reason a :has() is
# allowed - is enforced on the sources instead, where a comment can say why.
exec node_modules/.bin/stylelint theme.css "snippets/*.css" --max-warnings 0 "$@"
