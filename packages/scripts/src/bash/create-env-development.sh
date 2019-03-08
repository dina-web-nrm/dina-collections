#!/bin/bash

cp -n ./env/dev.backend ./env/.backend
cp -n ./env/dev.ui ./env/.ui

echo $PWD
cd ./env && for f in sample.*; do cp -n ${f} ${f/sample/}; done

exit 0