#! /bin/sh -
# https://unix.stackexchange.com/questions/321126/dash-arguments-to-shell-scripts

tag=latest verbose_level=0
while getopts t:v o; do
  case $o in
    (t) tag=$OPTARG;;
    (*) usage
  esac
done
echo "tag is $tag"


