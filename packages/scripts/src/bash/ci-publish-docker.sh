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


docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";

#push to docker hub

if [ "$CI_PUBLISH_UI" = true ]; then
  echo "Pushing dina/dina-collections-ui:$TRAVIS_TAG"
  docker push dina/dina-collections-ui:$TRAVIS_TAG
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  if [ "$CI_TAG_LATEST" = true ]; then
    echo "Pushing dina/dina-collections-ui:latest"
    docker push dina/dina-collections-ui:latest
    if [ $? -ne 0 ]; then
      echo "Aborting. exit is not 0"
      exit 1
    fi
  fi
fi

if [ "$CI_PUBLISH_API" = true ]; then
  echo "Pushing dina/dina-collections-api:$TRAVIS_TAG"
  docker push dina/dina-collections-api:$TRAVIS_TAG
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  if [ "$CI_TAG_LATEST" = true ]; then
    echo "Publishing dina/dina-collections-api:latest"
    docker push dina/dina-collections-api:latest
    if [ $? -ne 0 ]; then
      echo "Aborting. exit is not 0"
      exit 1
    fi
  fi
fi

if [ "$CI_PUBLISH_MIGRATIONS" = true ]; then
  echo "Pushing dina/dina-collections-migrations:$TRAVIS_TAG"
  docker push dina/dina-collections-migrations:$TRAVIS_TAG
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  if [ "$CI_TAG_LATEST" = true ]; then
    echo "Publishing dina/dina-collections-migrations:latest"
    docker push dina/dina-collections-migrations:latest
    if [ $? -ne 0 ]; then
      echo "Aborting. exit is not 0"
      exit 1
    fi
  fi
fi

if [ "$CI_PUBLISH_DOCS" = true ]; then
  echo "Pushing dina/dina-collections-docs:$TRAVIS_TAG"
  docker push dina/dina-collections-docs:$TRAVIS_TAG
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  if [ "$CI_TAG_LATEST" = true ]; then
    echo "Publishing dina/dina-collections-docs:latest"
    docker push dina/dina-collections-docs:latest
    if [ $? -ne 0 ]; then
      echo "Aborting. exit is not 0"
      exit 1
    fi
  fi
fi

if [ "$CI_PUBLISH_STYLE" = true ]; then
  echo "Pushing dina/dina-semantic-ui-docs:$TRAVIS_TAG"
  docker push dina/dina-semantic-ui-docs:$TRAVIS_TAG
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  if [ "$CI_TAG_LATEST" = true ]; then
    echo "Publishing dina/dina-semantic-ui-docs:latest"
    docker push dina/dina-semantic-ui-docs:latest
    if [ $? -ne 0 ]; then
      echo "Aborting. exit is not 0"
      exit 1
    fi
  fi
fi




