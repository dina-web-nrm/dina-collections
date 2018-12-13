#!/bin/sh -
# ./packages/scripts/src/bash/hard-redeploy-docker.sh  -t 4.5.2

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

FULL_PATH=$(dirname "$0")

git pull origin master
TAG=$TAG docker-compose pull
TAG=$TAG docker-compose -f docker-compose.data.yaml pull
$FULL_PATH/rm-data.sh
$FULL_PATH/create-sample-data.sh
TAG=$TAG docker-compose stop api worker
$FULL_PATH/migrate-data.sh -t $TAG
TAG=$TAG docker-compose up -d