#!/bin/sh -
#./packages/scripts/src/bash/ci-before-script.sh

START_DIRECTORY=$PWD

if [ "$CI_START_DATABASES" = true ]; then
  echo "Starting dbs"
  sudo /etc/init.d/postgresql stop
  yarn setup:env
  yarn start:postgres && yarn start:elasticsearch
  cd ./packages/migrations && yarn db:test:create
  cd $START_DIRECTORY
fi


if [ "$CI_START_API" = true ]; then
  : "${CI_START_DATABASES?CI_START_DATABASES Has to be true}"
  : "${CI_LINK_MIGRATIONS?CI_LINK_MIGRATIONS Has to be true}"
  echo "Setting up backend api"
  yarn setup:sample-data && cd ./packages/migrations && yarn setup:development
  cd $START_DIRECTORY
  echo "Starting api"
  cd ./packages/backend && yarn start &
  echo "Api started"
  cd $START_DIRECTORY
fi


if [ "$CI_START_UI" = true ]; then
  : "${CI_START_API?CI_START_API Has to be true}"
  echo "Starting UI"
  cd ./packages/ui && yarn start &
  echo "UI started"
  cd $START_DIRECTORY
fi

if [ "$CI_START_E2E_DOCKER" = true ]; then
  docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";

  echo "Stopping Travis postgresql"
  sudo /etc/init.d/postgresql stop

  echo "Setting up env"
  yarn setup:env

  echo "Building UI bundle and image"
  yarn build:ui
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  docker build -f ./packages/ui/Dockerfile -t dina/dina-collections-ui:ci ./packages/ui;
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  echo "Removing ui node_modules"
  # not needed in scope for migrations and backend images
  rm -rf ./packages/ui/node_modules

  echo "Building migrations image"
  docker build -f ./packages/migrations/Dockerfile -t dina/dina-collections-migrations:ci ./packages;
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  echo "Removing migrations & scripts node_modules"
  # not needed in scope for backend image
  rm -rf ./packages/scripts/node_modules
  rm -rf ./packages/migrations/node_modules

  echo "Building backend image"
  docker build -f ./packages/backend/Dockerfile -t dina/dina-collections-api:ci ./packages;
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  echo "Installing ui"
  # needed for cypress
  cd ./packages/ui && yarn install
  cd $START_DIRECTORY

  echo "Starting databases and keycloak"
  docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml up -d elasticsearch keycloak mysql postgres
  sleep 10

  echo "Importing sample data"
  TAG=ci docker-compose -f docker-compose.data.yaml up import

  echo "Starting application and worker containers"
  TAG=ci docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml up -d api ui baseWorker searchIndexWorker

  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi
