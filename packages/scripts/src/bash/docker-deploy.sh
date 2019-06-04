#!/bin/sh -
# ./packages/scripts/src/bash/docker-deploy.sh  -t 4.5.2
FULL_PATH=$(dirname "$0")

while getopts t:m: option
 do
  case "${option}"
   in
    t) TAG=${OPTARG};;
  esac
  case "${option}"
   in
    m) MIGRATE=${OPTARG};;
  esac
 done

if [ -z "$TAG" ]
then
   echo "usage: $0 -t <TAG>"
   exit 1
fi

echo "pulling TAG=$TAG and deploying locally using 'docker-compose up -d'"

$FULL_PATH/git-checkout-tag.sh -t $TAG

# uses local images if they exist, otherwise fetches the images from hub.docker.com
TAG=$TAG docker-compose up -d


if [ -z "$MIGRATE" ]
then
  echo "Not running migrations"
else
  echo "Running migrations"
  $FULL_PATH/docker-migrate-latest.sh -t $TAG
fi
