#!/bin/sh -
#./packages/scripts/src/bash/travis-test.sh


if [ "$YARN_INSTALL_UI" = true ]; then
  echo "Installing ui"
  yarn install:ui
fi

if [ "$YARN_INSTALL_MODELS" = true ]; then
  echo "Installing models"
  yarn install:schema
fi

if [ "$YARN_INSTALL_BACKEND" = true ]; then
  echo "Installing backend"
  yarn install:backend
fi

if [ "$YARN_INSTALL_COMMON" = true ]; then
  echo "Installing common"
  yarn install:common
fi

if [ "$YARN_INSTALL_MIGRATIONS" = true ]; then
  echo "Installing migrations"
  yarn install:migrations
fi
