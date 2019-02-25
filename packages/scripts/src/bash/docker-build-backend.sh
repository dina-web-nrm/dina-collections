#!/bin/sh -
# TRAVIS_TAG=v0.13.1 ./packages/scripts/src/bash/docker-build-backend.sh
if [ -z "$TRAVIS_TAG" ]; then
  echo "TRAVIS_TAG is empty, Abort" ;
  exit 0
fi


echo "Info: This script builds the backend docker-images"

docker build -f ./packages/backend/Dockerfile -t dina/dina-collections-api:$TRAVIS_TAG -t dina/dina-collections-api:latest ./packages;
if [ $? -ne 0 ]; then
  echo "Aborting. exit is not 0"
  exit 1
fi
