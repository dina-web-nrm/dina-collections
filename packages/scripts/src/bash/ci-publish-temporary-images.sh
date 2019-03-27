#!/bin/sh -
# OBS:login with docker-hub credentials, set in ~/.docker/config
# TRAVIS_TAG=v4.5.2 ./packages/scripts/src/bash/ci-publish-docker.sh
set -v
echo "$(date +'%T') start ci-publish-temporary-images"
if [ -z "$CI" ]; then
  echo "CI is empty, Abort. Only allowed to publish from CI" ;
  exit 0
fi


docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";

#push to docker hub

if [ "$CI_PUBLISH_UI" = true ]; then
  echo "Pushing dina/dina-collections-ui:$TRAVIS_BUILD_NUMBER"
  docker push dina/dina-collections-ui:$TRAVIS_BUILD_NUMBER
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_PUBLISH_API" = true ]; then
  echo "Pushing dina/dina-collections-api:$TRAVIS_BUILD_NUMBER"
  docker push dina/dina-collections-api:$TRAVIS_BUILD_NUMBER
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_PUBLISH_MIGRATIONS" = true ]; then
  echo "Pushing dina/dina-collections-migrations:$TRAVIS_BUILD_NUMBER"
  docker push dina/dina-collections-migrations:$TRAVIS_BUILD_NUMBER
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_PUBLISH_DOCS" = true ]; then
  echo "Pushing dina/dina-collections-docs:$TRAVIS_BUILD_NUMBER"
  docker push dina/dina-collections-docs:$TRAVIS_BUILD_NUMBER
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_PUBLISH_STYLE" = true ]; then
  echo "Pushing dina/dina-semantic-ui-docs:$TRAVIS_BUILD_NUMBER"
  docker push dina/dina-semantic-ui-docs:$TRAVIS_BUILD_NUMBER
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

echo "$(date +'%T') end ci-publish-temporary-images"