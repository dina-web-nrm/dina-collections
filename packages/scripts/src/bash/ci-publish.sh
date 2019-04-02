#!/bin/bash -
# OBS:login with docker-hub credentials, set in ~/.docker/config
set -ev
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
  "dina-collections-ui"
  "dina-collections-api"
  "dina-collections-migrations"
  "dina-collections-docs"
  "dina-semantic-ui"
)

for imageName in "${imageNames[@]}"; do
  echo "Pushing $imageName:$TRAVIS_TAG"
  docker pull $imageName:$TRAVIS_BUILD_NUMBER
  docker tag $imageName:$TRAVIS_BUILD_NUMBER $imageName:$TRAVIS_TAG
  docker push $imageName:$TRAVIS_TAG

  if [[ ${TRAVIS_TAG} != *"rc"* ]] && [[ ${TRAVIS_TAG} != *"test"* ]]; then
    echo "Pushing $imageName:latest"
    docker tag $imageName:$TRAVIS_BUILD_NUMBER $imageName:latest
    docker push $imageName:latest
  fi
done

echo "$(date +'%T') end ci-publish"