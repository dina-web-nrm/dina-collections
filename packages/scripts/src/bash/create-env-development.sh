#!/bin/bash
FULL_PATH=$(dirname "$0")
START_DIRECTORY=$PWD

cd ./env/sample
for f in *; do
  if [[ $f == *".dev"* ]]; then
    TARGET_NAME=".${f/.dev/}"
    if [ ! -f "../${TARGET_NAME}" ]; then
      echo "Copying file ./env/sample/$f to ./env/$TARGET_NAME"
      cp -n ${f} "../${TARGET_NAME}"
    else
      echo "Not replacing existing file ./env/$TARGET_NAME"
    fi

  fi
done

cd $START_DIRECTORY

$FULL_PATH/create-env.sh

exit 0
