#!/usr/bin/env bash
#MISE description="Check that the version and the changelog carry one number"
#MISE dir="{{config_root}}"
set -euo pipefail

exec node scripts/check-release.mjs "$@"
