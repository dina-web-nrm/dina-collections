#!/bin/sh -
#./packages/scripts/src/bash/ci-install.sh
set -ev
echo "$(date +'%T') start ci-install"

if [ "$CI_INSTALL_UI" = true ]; then
  echo "Installing ui"
  yarn install:ui --frozen-lockfile
fi

if [ "$CI_INSTALL_MODELS" = true ]; then
  echo "Installing models"
  yarn install:schema --frozen-lockfile
fi

if [ "$CI_INSTALL_BACKEND" = true ]; then
  echo "Installing backend"
  yarn install:backend --frozen-lockfile
fi

if [ "$CI_INSTALL_COMMON" = true ]; then
  echo "Installing common"
  yarn install:common --frozen-lockfile
fi

if [ "$CI_INSTALL_SCRIPTS" = true ]; then
  echo "Installing scripts"
  yarn install:scripts --frozen-lockfile
fi

if [ "$CI_INSTALL_MIGRATIONS" = true ]; then
  echo "Installing migrations"
  yarn install:migrations --frozen-lockfile
fi

if [ "$CI_INSTALL_STYLE" = true ]; then
  echo "Installing style"
  yarn install:semantic-ui --frozen-lockfile
fi

if [ "$CI_INSTALL_DOCS" = true ]; then
  echo "Installing docs"
  yarn install:docs --frozen-lockfile
fi

if [ "$CI_LINK_COMMON" = true ]; then
  : "${CI_INSTALL_COMMON?CI_INSTALL_COMMON Has to be true}"

  echo "Linking common"
  yarn setup:links:common
fi

if [ "$CI_LINK_UI" = true ]; then
  : "${CI_INSTALL_UI?CI_INSTALL_UI Has to be true}"
  : "${CI_LINK_COMMON?CI_LINK_COMMON Has to be true}"

  echo "Linking ui"
  yarn setup:links:ui
fi

if [ "$CI_LINK_SCRIPTS" = true ]; then
  : "${CI_INSTALL_SCRIPTS?CI_INSTALL_SCRIPTS Has to be true}"
  echo "Linking scripts"
  yarn setup:links:scripts
fi

if [ "$CI_LINK_BACKEND" = true ]; then
  : "${CI_INSTALL_BACKEND?CI_INSTALL_BACKEND Has to be true}"
  : "${CI_LINK_COMMON?CI_LINK_COMMON Has to be true}"

  echo "Linking backend"
  yarn setup:links:backend
fi

if [ "$CI_LINK_MIGRATIONS" = true ]; then
  : "${CI_INSTALL_MIGRATIONS?CI_INSTALL_MIGRATIONS Has to be true}"
  : "${CI_LINK_BACKEND?CI_LINK_BACKEND Has to be true}"
  : "${CI_LINK_SCRIPTS?CI_LINK_SCRIPTS Has to be true}"
  echo "Linking migrations"
  yarn setup:links:migrations
fi

echo "$(date +'%T') end ci-install"