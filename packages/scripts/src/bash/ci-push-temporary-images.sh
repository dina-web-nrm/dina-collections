#!/bin/bash -
# OBS:login with docker-hub credentials, set in ~/.docker/config
set -v
echo "$(date +'%T') start ci-push-temporary-images"
if [ -z "$CI" ]; then
  echo "CI is empty, Abort. Only allowed to publish from CI" ;
  exit 0
fi


docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";

#push to docker hub

if [ "$CI_BUILD_UI" = true ]; then
  echo "Pushing dina/dina-collections-ui:$TRAVIS_BUILD_NUMBER"
  docker push dina/dina-collections-ui:$TRAVIS_BUILD_NUMBER
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_BUILD_API" = true ]; then
  echo "Pushing dina/dina-collections-api:$TRAVIS_BUILD_NUMBER"
  docker push dina/dina-collections-api:$TRAVIS_BUILD_NUMBER
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_BUILD_MIGRATIONS" = true ]; then
  echo "Pushing dina/dina-collections-migrations:$TRAVIS_BUILD_NUMBER"
  docker push dina/dina-collections-migrations:$TRAVIS_BUILD_NUMBER
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_BUILD_DOCS" = true ]; then
  echo "Pushing dina/dina-collections-docs:$TRAVIS_BUILD_NUMBER"
  docker push dina/dina-collections-docs:$TRAVIS_BUILD_NUMBER
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_BUILD_STYLE" = true ]; then
  echo "Pushing dina/dina-semantic-ui-docs:$TRAVIS_BUILD_NUMBER"
  docker push dina/dina-semantic-ui-docs:$TRAVIS_BUILD_NUMBER
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

echo "$(date +'%T') end ci-push-temporary-images"