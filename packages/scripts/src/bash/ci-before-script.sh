#!/bin/sh -
#./packages/scripts/src/bash/ci-before-script.sh
set -v
echo "$(date +'%T') start ci-before-script"
START_DIRECTORY=$PWD

if [ "$CI_SETUP_ENV_DOCKER" = true ]; then
  echo "Setting up env for docker"
  yarn setup:env:ci:docker
  else
  echo "Setting up env for localhost"
  yarn setup:env:ci:local
fi

if [ "$CI_START_API" = true ]; then
  : "${CI_LINK_MIGRATIONS?CI_LINK_MIGRATIONS Has to be true}"
  echo "Stopping Travis postgresql"
  sudo /etc/init.d/postgresql stop

  echo "Starting databases"
  yarn start:postgres && yarn start:elasticsearch
  cd ./packages/migrations && yarn db:test:create

  echo "Setting up & importing sample data"
  cd $START_DIRECTORY
  yarn setup:sample-data && cd ./packages/migrations && yarn setup:development

  echo "Starting API"
  cd $START_DIRECTORY
  cd ./packages/backend && yarn start:node &

  echo "API started"
  cd $START_DIRECTORY
fi

if [ "$CI_START_E2E" = true ]; then
  echo "Stopping Travis postgresql"
  sudo /etc/init.d/postgresql stop

  echo "Setting up sample data"
  yarn setup:sample-data

  echo "Pulling docker images"
  docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";
  docker pull dina/dina-collections-ui:$TRAVIS_BUILD_NUMBER
  docker pull dina/dina-collections-api:$TRAVIS_BUILD_NUMBER
  docker pull dina/dina-collections-migrations:$TRAVIS_BUILD_NUMBER

  echo "Starting databases"
  docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml up -d elasticsearch postgres
  sleep 10

  echo "Importing sample data"
  TAG=$TRAVIS_BUILD_NUMBER docker-compose -f docker-compose.data.yaml -f docker-compose.data.ci.yaml up import

  echo "Starting keycloak"
  # have to start keycloak even if auth disabled since ui/nginx.conf requires it
  docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml up -d keycloak mysql

  echo "Starting ui, api and workers"
  TAG=$TRAVIS_BUILD_NUMBER docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml up -d api ui baseWorker searchIndexWorker

  if [ "$CI_DISABLE_AUTH" = true ]; then
    echo "Stopping keycloak because auth is disabled"
    docker stop keycloak
  fi

  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

echo "$(date +'%T') end ci-before-script"
