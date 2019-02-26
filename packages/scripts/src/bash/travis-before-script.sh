#!/bin/sh -
#./packages/scripts/src/bash/travis-before-script.sh

if [ "$DOCKER_START_DBS" = true ]; then
  echo "Starting dbs"
  sudo /etc/init.d/postgresql stop
  yarn setup:env
  yarn start:postgres & yarn start:elasticsearch
  cd ./packages/migrations && yarn db:test:create
fi



