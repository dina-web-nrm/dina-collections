#!/bin/sh
#./packages/scripts/src/bash/travis-deploy.sh

PUSH_BRANCH=master
TRAVIS_TAG=0.2.0

# If PUSH_BRANCH is master and TRAVIS_TAG exists, run otherwise abort


if [ -z "$PUSH_BRANCH" ] || [ "$PUSH_BRANCH" != "master" ]; then
	echo "The arg. 'PUSH_BRANCH' is empty or not 'master' , Abort" ;
	exit 1
fi

if [ -z "$TRAVIS_TAG" ]; then
	echo "TRAVIS_TAG is empty, Abort" ;
	exit 1
fi

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
    	echo "Aborting. exit is $?"
    	exit $?
fi

#Run publish-docker.sh -t TRAVIS_TAG
./packages/scripts/src/bash/publish-docker.sh  -t $TRAVIS_TAG
if [ $? -ne 0 ]; then
    	echo "Aborting. exit-status=$?"
    	exit $?
fi


