#!/bin/sh
# @desc Update build date/time tag file with current timestamp
# @changed 2023.01.26, 16:43
# NOTE: This script updates only .txt files not properties in `package.json`.
# Use `update-build-variables.sh` script before build.

# Import config variables (expected variables `$DIST_REPO` and `$PUBLISH_FOLDER`)...
test -f "./utils/config.sh" && . "./utils/config.sh"
test -f "./utils/config-local.sh" && . "./utils/config-local.sh"

# Check basic required variables...
test -f "./utils/config-check.sh" && . "./utils/config-check.sh"

node "./utils/update-build-time.js" --tz=$TIMEZONE
