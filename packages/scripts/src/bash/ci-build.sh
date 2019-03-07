#!/bin/sh -
#./packages/scripts/src/bash/ci-build.sh

TRAVIS_TAG="${TRAVIS_TAG:-$TAG}"

if [ -z "$TRAVIS_TAG" ]; then
  echo "TRAVIS_TAG and TAG is empty, Abort" ;
  exit 0
fi

if [ "$CI_BUILD_BACKEND" = true ]; then
  echo "Building backend"
  if [ "$CI_TAG_LATEST" = true ]; then
    echo "Tagging latest"
    docker build -f ./packages/backend/Dockerfile -t dina/dina-collections-api:$TRAVIS_TAG -t dina/dina-collections-api:latest ./packages;
  else
    echo "Not tagging latest"
    docker build -f ./packages/backend/Dockerfile -t dina/dina-collections-api:$TRAVIS_TAG  ./packages;
  fi
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_BUILD_MIGRATIONS" = true ]; then
  echo "Building migrations"
  if [ "$CI_TAG_LATEST" = true ]; then
    echo "Tagging latest"
    docker build -f ./packages/migrations/Dockerfile -t dina/dina-collections-migrations:$TRAVIS_TAG -t dina/dina-collections-migrations:latest ./packages;
  else
    echo "Not tagging latest"
    docker build -f ./packages/migrations/Dockerfile -t dina/dina-collections-migrations:$TRAVIS_TAG ./packages;
  fi

  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

fi

if [ "$CI_BUILD_UI" = true ]; then
  echo "Building ui"
  yarn build:ui;
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  if [ "$CI_TAG_LATEST" = true ]; then
    echo "Tagging latest"
    docker build -f ./packages/ui/Dockerfile -t dina/dina-collections-ui:$TRAVIS_TAG -t dina/dina-collections-ui:latest ./packages/ui;
  else
    echo "Not tagging latest"
    docker build -f ./packages/ui/Dockerfile -t dina/dina-collections-ui:$TRAVIS_TAG ./packages/ui;
  fi

  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_BUILD_STYLE" = true ]; then
  echo "Building style"
  yarn build:semantic-ui;
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  if [ "$CI_TAG_LATEST" = true ]; then
    echo "Tagging latest"
    docker build -f ./packages/dina-style/Dockerfile -t dina/dina-semantic-ui-docs:$TRAVIS_TAG -t dina/dina-semantic-ui-docs:latest ./packages/dina-style;
  else
    echo "Not tagging latest"
    docker build -f ./packages/dina-style/Dockerfile -t dina/dina-semantic-ui-docs:$TRAVIS_TAG ./packages/dina-style;
  fi

  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_BUILD_DOCS" = true ]; then
  echo "Building docs"
  yarn build:docs;
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  if [ "$CI_TAG_LATEST" = true ]; then
    echo "Tagging latest"
    docker build -f ./packages/docs/Dockerfile -t dina/dina-collections-docs:$TRAVIS_TAG -t dina/dina-collections-docs:latest ./packages/docs;
  else
    echo "Not tagging latest"
    docker build -f ./packages/docs/Dockerfile -t dina/dina-collections-docs:$TRAVIS_TAG ./packages/docs;
  fi

  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi



