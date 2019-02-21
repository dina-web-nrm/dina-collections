if [ -z "$VERSION_TYPE" ]
then
   echo "Not allowed to run yarn version. run yarn version:release, version:pre-release or version:test-release instead"
   exit 1
fi

echo "Running version hook"

if [ $VERSION_TYPE = "release" ]; then
  yarn build:version-info && yarn build:changelog
elif [ $VERSION_TYPE = "pre-release"  ]; then
  yarn build:version-info && yarn build:changelog
elif [ $VERSION_TYPE = "test-release"  ]; then
  echo "NOOP"
else
  echo "Unknown VERSION_TYPE"
  exit 1
fi
