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

