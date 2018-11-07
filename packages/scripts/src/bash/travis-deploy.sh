#!/bin/sh
#./packages/scripts/src/bash/travis-deploy.sh

PUSH_BRANCH=master
TRAVIS_TAG=0.1.0

# If PUSH_BRANCH is master and tag (TRAVIS_TAG)exist

#ensure-master-is-clean
./packages/scripts/src/bash/ensure-master-is-clean.sh
if [ $? -ne 0 ]; then
    echo "Master is not clean, aborting. exit-status=$?"
    exit $?
fi

#docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";
docker login

#Run build-docker.sh -t TRAVIS_TAG
./packages/scripts/src/bash/build-docker.sh  -t $TRAVIS_TAG
if [ $? -ne 0 ]; then
    echo "Aborting. exit-status=$?"
    exit $?
fi

#Run publish-docker.sh -t TRAVIS_TAG
./packages/scripts/src/bash/publish-docker.sh  -t $TRAVIS_TAG
if [ $? -ne 0 ]; then
    echo "Aborting. exit-status=$?"
    exit $?
fi


