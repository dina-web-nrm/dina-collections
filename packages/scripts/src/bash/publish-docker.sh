#!/bin/bash
# OBS:login with docker-hub credentials, set in ~/.docker/config
# failsafe: check if that tag/version has already been published before pushing?
# ./packages/scripts/src/bash/publish-docker.sh  -t 4.5.2

echo "Info: This script publishes images to Docker"
TAG=latest

while getopts t: option
 do
  case "${option}"
   in
    t) TAG=${OPTARG};;
  esac
 done

echo "Pushing TAG=$TAG to Dockerhub"

docker login

#push to docker hub
docker push dina/dina-collections-api:$TAG
docker push dina/dina-collections-ui:$TAG
docker push dina/dina-semantic-ui-docs:$TAG

