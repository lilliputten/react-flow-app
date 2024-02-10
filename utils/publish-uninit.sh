#!/bin/sh
# @desc Initialize publish syncing repository
# @changed 2023.01.26, 16:43

# NOTE: For uninstall/reinitialize publish submodule, use:
# ```shell
# rm -Rf publish .gitmodules .git/modules/publish
# ```

# Import config variables (expected variables `$DIST_REPO` and `$PUBLISH_FOLDER`)...
test -f "./utils/config.sh" && . "./utils/config.sh"
test -f "./utils/config-local.sh" && . "./utils/config-local.sh"

# Check basic required variables...
test -f "./utils/config-check.sh" && . "./utils/config-check.sh"

if [ -z "$PUBLISH_FOLDER" ]; then
  echo "Publish folder isn't specified. See 'PUBLISH_FOLDER' parameter in 'config.sh'"
  exit 1
fi

echo "Uninitializing publish folder & submodule for '$PUBLISH_FOLDER'..."

rm -Rf "$PUBLISH_FOLDER" .gitmodules ".git/modules/$PUBLISH_FOLDER" && \
  echo Ok
