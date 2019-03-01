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
  # : "${CI_START_API?CI_START_API Has to be true}"
  # : "${CI_START_DATABASES?CI_START_DATABASES Has to be true}"
  # echo "Building UI bundle"
  # yarn build:ui

  # if [ $? -ne 0 ]; then
  #   echo "Aborting. exit is not 0"
  #   exit 1
  # fi

  # echo "Building UI image and starting container"
  # NGINX_API_BASE_URL=$(ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+') NGINX_AUTH_BASE_URL=$(ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+')
  # docker build -f ./packages/ui/Dockerfile -t dina/dina-collections-ui:ci ./packages/ui
  # TAG="ci" docker-compose -f docker-compose.ci.yaml up -d ui
  # docker container ls -a
  # echo "sleeping"
  # sleep 5
  # docker container ls -a
  # docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' dina-collections-ui
  # docker-compose -f docker-compose.ci.yaml logs ui
  # docker network ls
  # docker network inspect host
  echo "Starting UI in dev mode"
  cd ./packages/ui && yarn start &

  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi
