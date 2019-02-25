#!/bin/sh -
# TRAVIS_TAG=v0.13.1 ./packages/scripts/src/bash/docker-build-ui.sh
if [ -z "$TRAVIS_TAG" ]; then
  echo "TRAVIS_TAG is empty, Abort" ;
  exit 0
fi


echo "Info: This script builds the ui docker-images"

npm run build:ui;
if [ $? -ne 0 ]; then
  echo "Aborting. exit is not 0"
  exit 1
fi

docker build -f ./packages/ui/Dockerfile -t dina/dina-collections-ui:$TRAVIS_TAG -t dina/dina-collections-ui:latest ./packages/ui;
if [ $? -ne 0 ]; then
  echo "Aborting. exit is not 0"
  exit 1
fi