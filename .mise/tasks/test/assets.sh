#!/usr/bin/env bash
#MISE description="The one hard rule: a theme reaches the network for nothing"
#MISE dir="{{config_root}}"
set -euo pipefail

exec node scripts/check-assets.mjs
