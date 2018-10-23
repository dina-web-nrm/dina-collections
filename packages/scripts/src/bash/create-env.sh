#!/bin/bash

echo $PWD
cd ./env && for f in sample.*; do cp -n ${f} ${f/sample/}; done
cd ..
cp -n ./env/local.backend ./packages/backend/.env
exit 0