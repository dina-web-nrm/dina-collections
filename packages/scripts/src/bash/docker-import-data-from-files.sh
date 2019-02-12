#!/bin/sh -
# ./packages/scripts/src/bash/docker-import-data-from-files.sh  -t 4.5.2

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

TAG=$TAG docker-compose -f docker-compose.data.yaml pull
TAG=$TAG docker-compose stop api baseWorker searchIndexWorker
TAG=$TAG docker-compose -f docker-compose.data.yaml up -d import
sleep 10
TAG=$TAG docker-compose stop ui
TAG=$TAG docker-compose up -d

