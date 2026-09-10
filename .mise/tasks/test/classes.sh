#!/usr/bin/env bash
#MISE description="Every class the theme styles is one a setting can actually produce"
#MISE dir="{{config_root}}"
set -euo pipefail

exec node scripts/check-classes.mjs
