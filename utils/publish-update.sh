#!/bin/sh
# @desc Update publish folder (prepare remote update)
# @since 2023.01.26, 16:43
# @changed 2023.04.27, 21:08

# Import config variables (expected variables `$DIST_REPO` and `$PUBLISH_FOLDER`)...
test -f "./utils/config.sh" && . "./utils/config.sh"
test -f "./utils/config-local.sh" && . "./utils/config-local.sh"

# Check basic required variables...
test -f "./utils/config-check.sh" && . "./utils/config-check.sh" # --omit-publish-folder-check

BUILD_FOLDER="build"

# Make build if absent
test -d "$BUILD_FOLDER" || npm run -s build || exit 1

TIMESTAMP=`cat build-timestamp.txt`
TIMETAG=`cat build-timetag.txt`
VERSION=`cat build-version.txt`

echo "Updating ($VERSION, $TIMESTAMP) publish folder '$PUBLISH_FOLDER' from build folder '$BUILD_FOLDER'..."

cd "$PUBLISH_FOLDER" && \
  pwd && \
  rm -Rf * && \
  cp -Rfu ../$BUILD_FOLDER/* . && \
  cp -Rfu ../$BUILD_FOLDER/.[^.]* . && \
  cd .. && \
  echo OK
  # If we have dot (`.*`, hidden) files in build:
  # cp -Rfu ../$BUILD_FOLDER/.[^.]* . && \
