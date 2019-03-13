#!/bin/sh
# ./packages/scripts/src/bash/ensure-branch-is-clean.sh

if !([ -z "$(git status --untracked-files=no --porcelain)" ]); then
  #  Working directory clean excluding untracked files
  echo "Branch is not clean: Need to Add or Commit ";
  exit 1
fi

exit 0
