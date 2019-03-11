#!/bin/bash

FULL_PATH=$(dirname "$0")
START_DIRECTORY=$PWD

cd ./env/ci
for f in *; do
  if [ ! -f "../.${f}" ]; then
  echo "Copying file ./env/ci/$f to ./env/.$f"
  cp -n ${f} "../.${f}"
  else
    echo "Not replacing existing file ./env/.$f"
  fi
done

cd $START_DIRECTORY
$FULL_PATH/create-env.sh

exit 0
