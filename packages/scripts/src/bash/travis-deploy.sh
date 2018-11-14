#!/bin/sh -
#./packages/scripts/src/bash/travis-deploy.sh

if [ -z "$TRAVIS_TAG" ]; then
	echo "TRAVIS_TAG is empty, Abort" ;
	exit 1
fi

docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";
#docker login

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


