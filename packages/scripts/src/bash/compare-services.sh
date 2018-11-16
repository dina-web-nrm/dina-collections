#!/bin/sh -
EXIT_STATUS=1;

if [ "$(wc -l < $PWD/services.txt)" -eq "$(docker ps | grep -f $PWD/services.txt | wc -l)" ]; then 
  EXIT_STATUS=0;
fi

return $EXIT_STATUS
