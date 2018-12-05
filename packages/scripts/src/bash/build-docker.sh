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
if [ $? -ne 0 ]; then
      echo "Aborting. exit is $?"
      exit $?
fi

docker build -f ./packages/ui/Dockerfile -t dina/dina-collections-ui:$TAG -t dina/dina-collections-ui:latest ./packages/ui;
if [ $? -ne 0 ]; then
      echo "Aborting. exit is $?"
      exit $?
fi

npm run uninstall;
docker build -f ./packages/backend/Dockerfile -t dina/dina-collections-api:$TAG -t dina/dina-collections-api:latest ./packages;
if [ $? -ne 0 ]; then
      echo "Aborting. exit is $?"
      exit $?
fi

docker build -f ./packages/migrations/Dockerfile -t dina/dina-collections-migrations:$TAG -t dina/dina-collections-migrations:latest ./packages;
if [ $? -ne 0 ]; then
      echo "Aborting. exit is $?"
      exit $?
fi
