#!/bin/sh

UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

EXIT_STATUS=4

if [ $LOCAL = $REMOTE ]; then
    echo "Up-to-date"
    EXIT_STATUS=0
elif [ $LOCAL = $BASE ]; then
    echo "Need to pull"
    EXIT_STATUS=1
elif [ $REMOTE = $BASE ]; then
    echo "Need to push"
    EXIT_STATUS=2
else
    echo "Diverged"
    EXIT_STATUS=3
fi
#echo "$?"
exit $EXIT_STATUS

