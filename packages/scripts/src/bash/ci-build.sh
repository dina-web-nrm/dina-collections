#!/bin/bash -
#./packages/scripts/src/bash/ci-build.sh
set -ev
echo "$(date +'%T') start ci-build"

if [ "$CI_BUILD_API" = true ]; then
  echo "Building backend"
  docker build -f ./packages/backend/Dockerfile -t dina/dina-collections-api:$TRAVIS_BUILD_NUMBER  .;
fi

if [ "$CI_BUILD_MIGRATIONS" = true ]; then
  echo "Building migrations"
  docker build -f ./packages/migrations/Dockerfile -t dina/dina-collections-migrations:$TRAVIS_BUILD_NUMBER .;
fi

if [ "$CI_BUILD_UI" = true ]; then
  echo "Building ui"
  yarn build:ui;
  docker build -f ./packages/ui/Dockerfile -t dina/dina-collections-ui:$TRAVIS_BUILD_NUMBER ./packages/ui;
fi

if [ "$CI_BUILD_STYLE" = true ]; then
  echo "Building style"
  yarn build:semantic-ui;
  docker build -f ./packages/style/Dockerfile -t dina/dina-semantic-ui-docs:$TRAVIS_BUILD_NUMBER ./packages/style;
fi

if [ "$CI_BUILD_DOCS" = true ]; then
  echo "Building docs"
  yarn build:docs;
  docker build -f ./packages/docs/Dockerfile -t dina/dina-collections-docs:$TRAVIS_BUILD_NUMBER ./packages/docs;
fi

echo "$(date +'%T') end ci-build"