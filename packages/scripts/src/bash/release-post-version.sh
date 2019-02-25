if [ -z "$VERSION_TYPE" ]
then
   echo "$VERSION_TYPE not found"
   exit 1
fi


echo "Running post-hooks"

GIT_TAG="v$npm_package_version"

echo $GIT_TAG

if [ $VERSION_TYPE = "release" ]; then
  git push origin master && git push origin $GIT_TAG
elif [ $VERSION_TYPE = "pre-release"  ]; then
  git push origin master && git push origin $GIT_TAG
elif [ $VERSION_TYPE = "test-release"  ]; then
  git push origin $GIT_TAG
else
  echo "Unknown VERSION_TYPE"
  exit 1
fi
