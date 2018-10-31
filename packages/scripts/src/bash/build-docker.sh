#!/bin/bash
# check npm version, npm run uninstall, should be greater than 5.5.1 
# break the build if npm fails ...
echo "Info: This script Builds docker-images"
TAG=latest

while getopts t: option
 do
  case "${option}"
   in
    t) TAG=${OPTARG};;
  esac
 done

echo "Pushing TAG=$TAG to Dockerhub"

npm run test
echo "TAG=$TAG" > .env
npm run build:ui;
docker build -f ./packages/ui/Dockerfile -t dina/dina-collections-ui:$TAG ./packages/ui;
npm run build:semantic-ui;
docker build -f ./packages/dina-style/Dockerfile -t dina/dina-semantic-ui-docs:$TAG ./packages/dina-style;
npm run uninstall;
docker build -f ./packages/backend/Dockerfile -t dina/dina-collections-api:$TAG ./packages;
