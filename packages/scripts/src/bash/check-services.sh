#!/bin/sh -
FULL_PATH=$(dirname "$0")

$FULL_PATH/compare-services.sh
if [ $? -eq 0 ]; then
  echo 'Match! All docker-services are running!'; else
  echo 'Warning: one or more docker-services are down!';
fi
