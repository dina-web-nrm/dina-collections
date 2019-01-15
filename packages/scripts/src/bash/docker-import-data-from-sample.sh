#!/bin/sh -
# ./packages/scripts/src/bash/docker-import-data-from-sample.sh  -t 4.5.2

while getopts t: option
 do
  case "${option}"
   in
    t) TAG=${OPTARG};;
  esac
 done

if [ -z "$TAG" ]
then
   echo "usage: $0 -t <TAG>"
   exit 1
fi

FULL_PATH=$(dirname "$0")

$FULL_PATH/rm-data.sh
$FULL_PATH/create-sample-data.sh
$FULL_PATH/docker-import-data-from-files.sh -t $TAG
