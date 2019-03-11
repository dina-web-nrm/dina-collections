#!/bin/bash

cd ./env/sample
for f in *; do
  if [[ $f == *".dev"* ]]; then
    echo "Not copying file: $f. (dev specific)"
  else
    if [ ! -f "../.${f}" ]; then
      echo "Copying file ./env/sample/$f to ./env/.$f"
      cp -n ${f} "../.${f}"
    else
      echo "Not replacing existing file ./env/.$f"
    fi
  fi
done
exit 0