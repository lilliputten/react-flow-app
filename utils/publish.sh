#!/bin/sh
# @desc Publish (and make if absent) publish build
# @changed 2023.01.26, 16:43

# Import config variables (expected variables `$DIST_REPO` and `$PUBLISH_FOLDER`)...
test -f "./utils/config.sh" && . "./utils/config.sh"
test -f "./utils/config-local.sh" && . "./utils/config-local.sh"

# Check basic required variables...
test -f "./utils/config-check.sh" && . "./utils/config-check.sh"

# Make build if absent
sh "./utils/publish-update.sh" || exit 1

TIMESTAMP=`cat build-timestamp.txt`
TIMETAG=`cat build-timetag.txt`
VERSION=`cat build-version.txt`

echo "Publishing build ($VERSION, $TIMESTAMP)..."

# TODO: Compare actual and previously published versions? (The git is checking for changes itself anyway.)

TAG_VALUE=$PUBLISH_TAG_ID.$VERSION

COMMIT_TEXT="Build $TAG_VALUE, $TIMESTAMP ($TIMETAG)"
# echo "Fetch..." && git fetch && git pull && \
cd "$PUBLISH_FOLDER" && \
  echo "Fetch..." && git fetch && git pull -Xours && \
  echo "Add files..." && git add . -Av && \
  echo "Commit..." && git commit -am "$COMMIT_TEXT" && \
  echo "Push basic branch..." && git push && \
  echo "Build info:" && cat build.txt && \
  cd ..
  # echo "Don't forget to update version for target project dependency (package.json, WebUiCore entry)"

  # echo "Create/update tag $TAG_VALUE..." && git tag -f -am "$COMMIT_TEXT" "$TAG_VALUE" && \
  # echo "Push tagged branch with tags..." && git push -f --tags && \

  # ( ( ( git tag | grep -q "v$VERSION" ) && echo "Tag exist: update" && git tag -d "v$VERSION" ) || echo "Tag absent: create" ) &&
  # ( git tag "v$VERSION" || echo "Tag already exists" ) && \

