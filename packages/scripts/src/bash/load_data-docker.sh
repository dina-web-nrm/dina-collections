#!/bin/sh -
# ./packages/scripts/src/bash/load_data-docker.sh  -t 4.5.2
TAG=latest
while getopts t: option
 do
  case "${option}"
   in
    t) TAG=${OPTARG};;
  esac
 done

echo "Loading data with TAG=$TAG'"
echo "TAG=$TAG" > .env #  the docker-compose.yml-file fetches the TAG from the .env-file (OBS: defaults to .env)

# uses local images if they exist, otherwise fetches the images from hub.docker.com
make load-sample-data
