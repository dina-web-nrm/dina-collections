#!/bin/sh -
#./packages/scripts/src/bash/ci-build.sh
set -v

if [ "$CI_BUILD_BACKEND" = true ]; then
  echo "Building backend"
  docker build -f ./packages/backend/Dockerfile -t dina/dina-collections-api:$TRAVIS_BUILD_NUMBER  .;
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_BUILD_MIGRATIONS" = true ]; then
  echo "Building migrations"
  docker build -f ./packages/migrations/Dockerfile -t dina/dina-collections-migrations:$TRAVIS_BUILD_NUMBER .;

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

  docker build -f ./packages/ui/Dockerfile -t dina/dina-collections-ui:$TRAVIS_BUILD_NUMBER ./packages/ui;

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

  docker build -f ./packages/dina-style/Dockerfile -t dina/dina-semantic-ui-docs:$TRAVIS_BUILD_NUMBER ./packages/dina-style;

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

  docker build -f ./packages/docs/Dockerfile -t dina/dina-collections-docs:$TRAVIS_BUILD_NUMBER ./packages/docs;

  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi



