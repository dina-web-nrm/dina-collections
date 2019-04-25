#!/bin/bash -
# OBS:login with docker-hub credentials, set in ~/.docker/config
# TRAVIS_TAG=v4.5.2 ./packages/scripts/src/bash/ci-publish-docker.sh
set -v
echo "$(date +'%T') start ci-publish"
if [ -z "$TRAVIS_TAG" ]; then
  echo "TRAVIS_TAG is empty, Abort" ;
  exit 0
fi

if [ -z "$CI" ]; then
  echo "CI is empty, Abort. Only allowed to publish from CI" ;
  exit 0
fi


docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";

declare -a imageNames=(
  "dina/dina-collections-ui"
  "dina/dina-collections-api"
  "dina/dina-collections-migrations"
  "dina/dina-collections-docs"
  "dina/dina-semantic-ui-docs"
)

for imageName in "${imageNames[@]}"; do
  echo "Pushing $imageName:$TRAVIS_TAG"
  docker pull $imageName:$TRAVIS_BUILD_NUMBER
  docker tag $imageName:$TRAVIS_BUILD_NUMBER $imageName:$TRAVIS_TAG
  docker push $imageName:$TRAVIS_TAG
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi

  if [[ ${TRAVIS_TAG} != *"rc"* ]] && [[ ${TRAVIS_TAG} != *"test"* ]]; then
    echo "Pushing $imageName:latest"
    docker tag $imageName:$TRAVIS_BUILD_NUMBER $imageName:latest
    docker push $imageName:latest
    if [ $? -ne 0 ]; then
      echo "Aborting. exit is not 0"
      exit 1
    fi
  fi
done

echo "$(date +'%T') end ci-publish"