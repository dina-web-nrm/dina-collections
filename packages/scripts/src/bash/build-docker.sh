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

echo "Info: This script builds 3 docker-images"
echo "Pushing TAG=$TAG to Dockerhub"

npm run build:ui;
docker build -f ./packages/ui/Dockerfile -t dina/dina-collections-ui:$TAG ./packages/ui;
npm run uninstall;
docker build -f ./packages/backend/Dockerfile -t dina/dina-collections-api:$TAG ./packages;
docker build -f ./packages/migrations/Dockerfile -t dina/dina-collections-migrations:$TAG ./packages;