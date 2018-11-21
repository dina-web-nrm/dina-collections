#!/bin/sh -
FULL_PATH=$(dirname "$0")

EXIT_STATUS=1;

if [ "$(wc -l < $FULL_PATH/services.txt)" -eq "$(docker ps | grep -f $FULL_PATH/services.txt | wc -l)" ]; then 
  EXIT_STATUS=0;
fi

return $EXIT_STATUS
