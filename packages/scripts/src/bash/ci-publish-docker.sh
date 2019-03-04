#!/bin/sh -
# OBS:login with docker-hub credentials, set in ~/.docker/config
# TRAVIS_TAG=v4.5.2 ./packages/scripts/src/bash/ci-publish-docker.sh

if [ -z "$TRAVIS_TAG" ]; then
  echo "TRAVIS_TAG is empty, Abort" ;
  exit 0
fi

if [ -z "$CI" ]; then
  echo "CI is empty, Abort. Only allowed to publish from CI" ;
  exit 0
fi


echo "Info: This script builds the ui docker-images"


docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";


echo "Info: This script publishes 3 images to Docker"
echo "Pushing TAG=$TRAVIS_TAG to Dockerhub"

#docker login

#push to docker hub

docker push dina/dina-collections-api:$TRAVIS_TAG
docker push dina/dina-collections-ui:$TRAVIS_TAG
docker push dina/dina-collections-migrations:$TRAVIS_TAG
docker push dina/dina-collections-docs:$TRAVIS_TAG

docker push dina/dina-collections-api:latest
docker push dina/dina-collections-ui:latest
docker push dina/dina-collections-migrations:latest
docker push dina/dina-collections-docs:latest

