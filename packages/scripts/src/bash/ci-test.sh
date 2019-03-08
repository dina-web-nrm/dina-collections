#!/bin/sh -
#./packages/scripts/src/bash/ci-test.sh

START_DIRECTORY=$PWD

if [ "$CI_TEST_ALL" = true ]; then
  yarn test
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_TEST_E2E_LOCAL" = true ]; then
  echo "Running test suite CI_TEST_E2E"
  cd ./packages/ui && yarn test:e2e:ci:local
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_E2E passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_E2E_DOCKER" = true ]; then
  echo "Running test suite CI_TEST_E2E_DOCKERIZED"
  cd ./packages/ui && yarn test:e2e:ci:docker
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_E2E_DOCKERIZED passed"
  cd $START_DIRECTORY
fi


if [ "$CI_TEST_UI_LINT" = true ]; then
  echo "Running test suite CI_TEST_UI_LINT"
  cd ./packages/ui && yarn lint:js
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_UI_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_UI_UNIT" = true ]; then
  echo "Running test suite CI_TEST_UI_UNIT"
  cd ./packages/ui && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_UI_UNIT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_MODELS_LINT" = true ]; then
  echo "Running test suite CI_TEST_MODELS_LINT"
  cd ./packages/models && yarn lint:js
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_MODELS_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_COMMON_LINT" = true ]; then
  echo "Running test suite CI_TEST_COMMON_LINT"
  cd ./packages/common && yarn lint:js
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_COMMON_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_COMMON_UNIT" = true ]; then
  echo "Running test suite CI_TEST_COMMON_UNIT"
  cd ./packages/common && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_COMMON_UNIT passed"
  cd $START_DIRECTORY
fi


if [ "$CI_TEST_SCRIPTS_LINT" = true ]; then
  echo "Running test suite CI_TEST_SCRIPTS_LINT"
  cd ./packages/scripts && yarn lint:js
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_SCRIPTS_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_BACKEND_LINT" = true ]; then
  echo "Running test suite CI_TEST_BACKEND_LINT"
  yarn setup:env && cd ./packages/backend && yarn lint:js
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_BACKEND_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_BACKEND_UNIT" = true ]; then
  echo "Running test suite CI_TEST_BACKEND_UNIT"
  yarn setup:env && cd ./packages/backend && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_BACKEND_UNIT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_BACKEND_DB" = true ]; then
  echo "Running test suite CI_TEST_BACKEND_DB"
  cd ./packages/backend && yarn test:db
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  exit 0
  echo "Test suite CI_TEST_BACKEND_DB passed"
fi


if [ "$CI_TEST_BACKEND_API" = true ]; then
  echo "Running test suite CI_TEST_BACKEND_API"
  cd ./packages/backend && yarn test:api
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  exit 0
  echo "Test suite CI_TEST_BACKEND_API passed"
fi


if [ "$CI_TEST_MIGRATIONS_LINT" = true ]; then
  echo "Running test suite CI_TEST_MIGRATIONS_LINT"
  cd ./packages/migrations && yarn lint:js
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_MIGRATIONS_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_DOCS_LINT" = true ]; then
  echo "Running test suite CI_TEST_DOCS_LINT"
  cd ./packages/docs && yarn lint
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_DOCS_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_DOCS_UNIT" = true ]; then
  echo "Running test suite CI_TEST_DOCS_UNIT"
  cd ./packages/docs && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_DOCS_UNIT passed"
  cd $START_DIRECTORY
fi





