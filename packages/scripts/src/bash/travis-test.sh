#!/bin/sh -
#./packages/scripts/src/bash/travis-test.sh

START_DIRECTORY=$PWD

if [ "$TEST_SUITE_ALL" = true ]; then
  yarn test
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$TEST_SUITE_UI_LINT" = true ]; then
  echo "Running test suite TEST_SUITE_UI_LINT"
  cd ./packages/ui && yarn lint:js
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  cd $START_DIRECTORY
fi

if [ "$TEST_SUITE_UI_UNIT" = true ]; then
  echo "Running test suite TEST_SUITE_UI_UNIT"
  cd ./packages/ui && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  cd $START_DIRECTORY
fi

if [ "$TEST_SUITE_MODELS" = true ]; then
  echo "Running test suite TEST_SUITE_MODELS"
  cd ./packages/models && yarn lint:js && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  cd $START_DIRECTORY
fi

if [ "$TEST_SUITE_BACKEND" = true ]; then
  echo "Running test suite TEST_SUITE_BACKEND"
  yarn setup:env && cd ./packages/backend && yarn lint:js && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  cd $START_DIRECTORY
fi

if [ "$TEST_SUITE_COMMON" = true ]; then
  echo "Running test suite TEST_SUITE_COMMON"
  cd ./packages/common && yarn lint:js && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  cd $START_DIRECTORY
fi

if [ "$TEST_SUITE_MIGRATIONS" = true ]; then
  echo "Running test suite $TEST_SUITE_MIGRATIONS"
  echo "Note: only running lint tests"
  cd ./packages/migrations && yarn lint:js
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  cd $START_DIRECTORY
fi



