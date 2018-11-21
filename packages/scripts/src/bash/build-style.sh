#!/bin/sh -
# ./packages/scripts/src/bash/build-docker.sh  -t 4.5.2
usage()
{
    echo "usage: $0 -t <TAG>"
}

while getopts t: option
 do
  case "${option}"
   in
    (t) TAG=${OPTARG};;
  esac
 done

if [ -z "$TAG" ]
then
   usage
   exit 1
fi

echo "Info: This script builds 4 docker-images"
echo "Pushing TAG=$TAG to Dockerhub"

npm run build:semantic-ui;
docker build -f ./packages/dina-style/Dockerfile -t dina/dina-semantic-ui-docs:$TAG ./packages/dina-style;
