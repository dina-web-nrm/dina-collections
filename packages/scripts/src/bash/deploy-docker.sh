#!/bin/sh -
# ./packages/scripts/src/bash/deploy-docker.sh  -t 4.5.2
usage()
{
    echo "usage: $0 -t <TAG>"
}

while getopts t: option
 do
  case "${option}"
   in
    t) TAG=${OPTARG};;
  esac
 done

if [ -z "$TAG" ]
then
   usage
   exit 1
fi

echo "pulling TAG=$TAG and deploying locally using 'make up'"
echo "TAG=$TAG" > .env #  the docker-compose.yml-file fetches the TAG from the .env-file (OBS: defaults to .env)

# uses local images if they exist, otherwise fetches the images from hub.docker.com
make up
