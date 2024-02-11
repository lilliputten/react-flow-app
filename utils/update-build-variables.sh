#!/bin/sh
# @desc Update version number & build timestamps
# @changed 2024.02.11, 15:13

# Import config variables (expected variables `$DIST_REPO` and `$PUBLISH_FOLDER`)...
test -f "./utils/config.sh" && . "./utils/config.sh"
test -f "./utils/config-local.sh" && . "./utils/config-local.sh"

# # Check basic required variables...
# test -f "./utils/config-check.sh" && . "./utils/config-check.sh" --omit-publish-folder-check

# Run js updater (make changes in `build-*` files; see list below)...
# TODO: To check exit status?
if ! node "./utils/update-build-time.js"; then
  echo "Failed execution of 'update-build-time.js'!"
  exit 1
fi

# Read variables from changed files...
TIMESTAMP=`cat build-timestamp.txt`
TIMETAG=`cat build-timetag.txt`
VERSION=`cat build-version.txt`

echo "Version/time: $VERSION / $TIMESTAMP"

UPDATE_FILE() {
  FILE=$1
  if [ ! -f $FILE ]; then
    # echo "File $FILE not exists"
    return
  fi
  EXT="${FILE##*.}" # Exract extension
  echo "Processing file $FILE..."
  mv $FILE $FILE.bak || exit 1
  # # TODO: Replace only first occurence of `version`
  if [ "$FILE" = "package-lock.json" ]; then # package-lock
    # NOTE: Update only first occurenece of verion parameter in package-lock...
    cat $FILE.bak \
      | sed "0,/\(\"version\":\) \".*\"/{s//\1 \"$VERSION\"/}" \
    > $FILE || exit 1
  elif [ "$EXT" = "json" ]; then # JSON
    cat $FILE.bak \
      | sed "s/\(\"version\":\) \".*\"/\1 \"$VERSION\"/" \
      | sed "s/\(\"timestamp\":\) \".*\"/\1 \"$TIMESTAMP\"/" \
      | sed "s/\(\"timetag\":\) \".*\"/\1 \"$TIMETAG\"/" \
    > $FILE || exit 1
  elif [ "$EXT" = "local" ]; then # env.local files
    cat $FILE.bak \
      | sed "s/\(version=\)\s*\".*\"/\1\"$VERSION\"/" \
      | sed "s/\(timestamp=\)\s*\".*\"/\1\"$TIMESTAMP\"/" \
      | sed "s/\(timetag=\)\s*\".*\"/\1\"$TIMETAG\"/" \
    > $FILE || exit 1
  else # MD
    cat $FILE.bak \
      | sed "s/^\(-* *Version:\) .*$/\1 $VERSION/" \
      | sed "s/^\(-* *Last changes timestamp:\) .*$/\1 $TIMESTAMP/" \
      | sed "s/^\(-* *Last changes timetag:\) .*$/\1 $TIMETAG/" \
    > $FILE || exit 1
  fi
  rm $FILE.bak || exit 1
}

UPDATE_FILE ".env.local"
UPDATE_FILE "package.json"
UPDATE_FILE "package-lock.json"
UPDATE_FILE "README.md"
UPDATE_FILE "public/index.html"
UPDATE_FILE "public/package.json"
UPDATE_FILE "public/README.md"
UPDATE_FILE "public/package.json"
UPDATE_FILE "server/package.json"
UPDATE_FILE "server/README.md"
