#!/bin/sh -
# ./packages/scripts/src/bash/git-checkout-tag.sh  -t 4.5.2

while getopts t: option
 do
  case "${option}"
   in
    t) TAG=${OPTARG};;
  esac
 done

if [ -z "$TAG" ]
then
   echo "usage: $0 -t <TAG>"
   exit 1
fi

echo "pulling TAG=$TAG and deploying locally using 'docker-compose up -d'"


umask 002
if [[ -z $(git status -s) ]]
then
  echo "tree is clean. fetching tags"
  git fetch origin 'refs/tags/*:refs/tags/*'
  echo "fetch done. Checking out tag $TAG"
  git checkout $TAG
  echo "pull master done"
else
  echo "tree is dirty, stashing changes"
  git stash
  echo "stash done. fetching tags"
  git fetch origin 'refs/tags/*:refs/tags/*'
  echo "fetch done. checking out tag $TAG"
  git checkout $TAG
  git stash pop
  echo "stash pop done"
fi



