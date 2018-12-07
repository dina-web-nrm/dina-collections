#!/bin/bash

echo $PWD
cd ./data && for f in sample.*; do cp -n ${f} ${f/sample/}; done
exit 0