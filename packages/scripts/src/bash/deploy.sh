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
echo "TAG=$TAG" > .env #  docker-compose.yml fetches the TAG from this file

make up
