#!/bin/sh
# https://stackoverflow.com/questions/3258243/check-if-pull-needed-in-git
# ./packages/scripts/src/bash/ensure-master-is-clean.sh

UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

EXIT_STATUS=1

if [[ "$BRANCH" != "master" ]]; then
  echo 'Aborting script branch not master';
  exit 1;
fi

if !([ -z "$(git status --untracked-files=no --porcelain)" ]); then
  #  Working directory clean excluding untracked files
  echo "Need to Add or Commit ";
elif [ $LOCAL = $REMOTE ]; then
  echo "Up-to-date"
  EXIT_STATUS=0
elif [ $LOCAL = $BASE ]; then
  echo "Need to pull"
  EXIT_STATUS=1
elif [ $REMOTE = $BASE ]; then
  echo "Need to push" # 2018-11-07, add credentials to xxx ?
  EXIT_STATUS=1
else
  echo "Diverged"
fi

#echo "$?"
exit $EXIT_STATUS