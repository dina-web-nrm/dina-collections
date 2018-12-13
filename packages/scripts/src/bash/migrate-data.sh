#!/bin/sh -
# ./packages/scripts/src/bash/migrate-docker.sh  -t 4.5.2

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

echo "pulling TAG=$TAG and migrating using 'docker-compose -f docker-compose.data.yaml up -d migrations'"


# uses local images if they exist, otherwise fetches the images from hub.docker.com
TAG=$TAG docker-compose -f docker-compose.data.yaml up -d migrations
