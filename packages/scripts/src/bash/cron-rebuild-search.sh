#!/bin/bash

test -f ./env && source ./env

FULL_PATH=$(dirname "$0")

$FULL_PATH/docker-rebuild-search.sh -t $TAG
