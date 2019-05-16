#!/bin/bash -

# Not that you have to install jq if you are using a mac. Install with: brew install jq


while getopts t:u: option
 do
  case "${option}"
   in
    t) TAG=${OPTARG};;
  esac
  case "${option}"
   in
    u) DOCKER_USERNAME=${OPTARG};;
  esac
 done


read -s -p "Enter docker password: "  DOCKER_PASSWORD



if [ -z "$TAG" ]
then
   echo "usage: $0 -t <TAG> -u <DOCKER_USERNAME>"
   exit 1
fi

if [ -z "$DOCKER_USERNAME" ]
then
   echo "usage: $0 -t <TAG> -u <DOCKER_USERNAME>"
   exit 1
fi


if [ -z "$DOCKER_PASSWORD" ]
then
   echo "Provide DOCKER_PASSWORD"
   exit 1
fi


declare -a imageNames=(
  "dina/dina-collections-ui"
  "dina/dina-collections-api"
  "dina/dina-collections-migrations"
  "dina/dina-collections-docs"
  "dina/dina-semantic-ui-docs"
)

TAGS_TO_DELETE=$(git ls-remote --tags   | sed -n 's_^.*/\([^/}]*\)$_\1_p' | grep "$TAG-test" | tr '\n' ' ')


TAG_ARRAY=($TAGS_TO_DELETE)

DOCKER_HUB_TOKEN=$(curl -s -H "Content-Type: application/json" -X POST -d '{"username": "'$DOCKER_USERNAME'", "password": "'$DOCKER_PASSWORD'"}' https://hub.docker.com/v2/users/login/ | jq -r .token)

if [ $? -ne 0 ]; then
  echo "Aborting. exit is not 0"
  exit 1
fi

if [ "$DOCKER_HUB_TOKEN" == "null" ]
then
   echo "Could not fetch DOCKER_HUB_TOKEN likely username and password dont match"
   exit 1
fi


echo "Deleting tags from docker hub"
for tagName in "${TAG_ARRAY[@]}"; do
  for imageName in "${imageNames[@]}"; do
    echo "$imageName $tagName"
    url="https://hub.docker.com/v2/repositories/$imageName/tags/$tagName/"
    echo $url
    curl -X DELETE -s -i -H "Authorization: JWT ${DOCKER_HUB_TOKEN}" $url
  done
done

echo "Deleting tags from github"
git push --delete origin $TAGS_TO_DELETE

