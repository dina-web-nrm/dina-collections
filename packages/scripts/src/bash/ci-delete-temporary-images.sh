set -v
echo "$(date +'%T') start ci-delete-temporary-images"

if [ -z "$CI" ]; then
  echo "CI is empty, Abort. Only allowed to publish from CI" ;
  exit 0
fi

DOCKER_HUB_TOKEN=$(curl -s -H "Content-Type: application/json" -X POST -d '{"username": "'$DOCKER_USERNAME'", "password": "'$DOCKER_PASSWORD'"}' https://hub.docker.com/v2/users/login/ | jq -r .token)

imageNames=("dina-collections-ui" "dina-collections-api" "dina-collections-migrations" "dina-collections-docs" "dina-semantic-ui")

for imageName in "${imageNames[@]}"; do
  echo -e "\n\n\nDeleting docker image $imageName:$TRAVIS_BUILD_NUMBER"
  curl -X DELETE -s -i -H "Authorization: JWT ${DOCKER_HUB_TOKEN}" https://hub.docker.com/v2/repositories/dina/$imageName/tags/$TRAVIS_BUILD_NUMBER/
done

echo "$(date +'%T') end ci-delete-temporary-images"
exit 0
