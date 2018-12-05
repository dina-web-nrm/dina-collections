#!/bin/sh -
#./packages/scripts/src/bash/travis-deploy.sh

FULL_PATH=$(dirname "$0")

if [ -z "$TRAVIS_TAG" ]; then
  echo "TRAVIS_TAG is empty, Abort" ;
  exit 0
fi

docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";
#docker login

$FULL_PATH/build-docker.sh  -t $TRAVIS_TAG
if [ $? -ne 0 ]; then
  echo "Aborting. exit is not 0"
  exit 1
fi


$FULL_PATH/publish-docker.sh  -t $TRAVIS_TAG
if [ $? -ne 0 ]; then
  echo "Aborting. exit is not 0"
  exit 1
fi

