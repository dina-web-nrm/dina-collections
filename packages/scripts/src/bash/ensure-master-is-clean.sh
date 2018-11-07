#!/bin/sh
# https://stackoverflow.com/questions/3258243/check-if-pull-needed-in-git
# "The script assumes that you've done a git fetch or git remote update first, to bring the tracking branches up to date."

git fetch

UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

EXIT_STATUS=1

if !([ -z "$(git status --untracked-files=no --porcelain)" ]); then
  #  Working directory clean excluding untracked files
  echo "Need to Add or Commit ";
elif [ $LOCAL = $REMOTE ]; then
    echo "Up-to-date"
    EXIT_STATUS=0
elif [ $LOCAL = $BASE ]; then
    echo "Need to pull"
elif [ $REMOTE = $BASE ]; then
    echo "Need to push"
else
    echo "Diverged"
fi

#echo "$?"
exit $EXIT_STATUS
