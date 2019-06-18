#!/bin/bash

test -f ./env && source ./env

FULL_PATH=$(dirname "$0")

$FULL_PATH/docker-import-data-from-files.sh -t $TAG
