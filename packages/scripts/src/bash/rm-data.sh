#!/bin/bash

echo $PWD
cd ./data && for f in sample.*; do rm ${f/sample/} || true; done
exit 0