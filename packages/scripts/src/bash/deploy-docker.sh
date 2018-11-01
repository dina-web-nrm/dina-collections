#! /bin/sh -
# ./packages/scripts/src/bash/deploy.sh  -t 4.5.2
TAG=latest
while getopts t: option
 do
  case "${option}"
   in
    t) TAG=${OPTARG};;
  esac
 done

echo "pulling TAG=$TAG and deploying locally using 'make up'"
echo "TAG=$TAG" > .env #  the docker-compose.yml-file fetches the TAG from the .env-file (OBS: defaults to .env)

# uses local images if they exist, otherwise fetches the images from hub.docker.com
make up
