#!/bin/bash

FULL_PATH=$(dirname "$0")
START_DIRECTORY=$PWD

cd ./env/ci
for f in *; do
  if [[ $f == *".docker"* ]]; then
    TARGET_NAME=".${f/.docker/}"
    if [ ! -f "../${TARGET_NAME}" ]; then
      echo "Copying file ./env/ci/$f to ./env/$TARGET_NAME"
      cp -n ${f} "../${TARGET_NAME}"
    else
      echo "Not replacing existing file ./env/$TARGET_NAME"
    fi
  fi
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
