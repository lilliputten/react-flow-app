#!/bin/sh
# @desc Config variables (common version -- stored in repository)
# @changed 2023.11.12, 00:00

# NOTE: May be overrided by `config-local.sh`
# NOTE: Don't forget to update rules in `public-publish/.htaccess` and `public-publish/robots.txt` files if you changed branch from production to demo.

# NOTE: It's possible to incorporate current branch (`DIST_BRANCH`) into the build tag?
DIST_BRANCH="publish" # Production build -> html-app-build

# Use the repo from `.git/config`
DIST_REPO="git@github.com:lilliputten/sankey-graph-app.git"
SRC_TAG_PREFIX="v" # "v" for default tags like "v.X.Y.Z"

PUBLISH_FOLDER="publish" # "$DIST_BRANCH"
PUBLISH_TAG_ID="publish" # "$DIST_BRANCH"

# Timezone for timestamps (GMT, Europe/Moscow, Asia/Bangkok, etc)
# NOTE: See duplications in 'config.js'
TIMEZONE="Asia/Bangkok"
