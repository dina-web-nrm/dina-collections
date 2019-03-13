if [ -z "$VERSION_TYPE" ]
then
   echo "Not allowed to run yarn version. run yarn version:release, version:pre-release or version:test-release instead"
   exit 1
fi

echo "Running version hook $npm_package_version"

if [ $VERSION_TYPE = "release" ]; then
  yarn build:version-info && yarn build:changelog
elif [ $VERSION_TYPE = "pre-release"  ]; then
  if [[ $npm_package_version == *".rc"* ]]; then
    yarn build:version-info && yarn build:changelog
  else
    echo "Not allowed to create pre-release not including 'rc'. Use ex 0.17.2-rc1"
    exit 1
  fi

elif [ $VERSION_TYPE = "test-release"  ]; then
  if [[ $npm_package_version == *"-test"* ]]; then
    echo "NOOP"
  else
    echo "Not allowed to create test-version not including '-test'. Use ex 0.17.2-test-search-1"
    exit 1
  fi
else
  echo "Unknown VERSION_TYPE"
  exit 1
fi
