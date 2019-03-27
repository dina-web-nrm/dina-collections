#!/bin/sh -
#./packages/scripts/src/bash/ci-before-script.sh
set -v
echo "$(date +'%T') start ci-before-script"
START_DIRECTORY=$PWD

if [ "$CI_SETUP_ENV_DOCKER" = true ]; then
  yarn setup:env:ci:docker
  yarn setup:env
else
  yarn setup:env:ci:local
fi

if [ "$CI_START_DATABASES" = true ]; then
  echo "Starting dbs"
  sudo /etc/init.d/postgresql stop
  yarn start:postgres && yarn start:elasticsearch
  cd ./packages/migrations && yarn db:test:create
  cd $START_DIRECTORY
fi

# do this early, to let it compile in the background
if [ "$CI_START_UI" = true ]; then
  : "${CI_START_API?CI_START_API Has to be true}"
  echo "Starting UI"
  cd ./packages/ui && yarn start &
  echo "UI started"
  cd $START_DIRECTORY
fi


if [ "$CI_START_KEYCLOAK" = true ]; then
  : "${CI_START_DATABASES?CI_START_DATABASES Has to be true}"
  echo "Starting keycloak"
  yarn start:keycloak
  cd $START_DIRECTORY
fi

if [ "$CI_START_API" = true ]; then
  : "${CI_START_DATABASES?CI_START_DATABASES Has to be true}"
  : "${CI_LINK_MIGRATIONS?CI_LINK_MIGRATIONS Has to be true}"
  echo "Setting up backend api"
  yarn setup:sample-data && cd ./packages/migrations && yarn setup:development
  cd $START_DIRECTORY
  echo "Starting api"
  cd ./packages/backend && yarn start:node &
  echo "Api started"
  cd $START_DIRECTORY
fi

if [ "$CI_START_E2E_DOCKER" = true ]; then
  : "${CI_SETUP_ENV_DOCKER?CI_SETUP_ENV_DOCKER Has to be true}"
  docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";

  echo "Stopping Travis postgresql"
  sudo /etc/init.d/postgresql stop

  docker pull dina/dina-collections-ui:$TRAVIS_BUILD_NUMBER
  docker pull dina/dina-collections-api:$TRAVIS_BUILD_NUMBER
  docker pull dina/dina-collections-migrations:$TRAVIS_BUILD_NUMBER

  echo "Setup sample data"
  yarn setup:sample-data

  echo "Starting databases and keycloak"
  docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml up -d elasticsearch keycloak mysql postgres
  sleep 10

  echo "Importing sample data"
  TAG=$TRAVIS_BUILD_NUMBER docker-compose -f docker-compose.data.yaml -f docker-compose.data.ci.yaml up import

  echo "Starting application and worker containers"
  TAG=$TRAVIS_BUILD_NUMBER docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml up -d api ui baseWorker searchIndexWorker

  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

echo "$(date +'%T') end ci-before-script"
