if [ -z "$VERSION_TYPE" ]
then
   echo "Not allowed to run yarn version. run yarn version:release, version:pre-release or version:test-release instead"
   exit 1
fi


echo "Creating $VERSION_TYPE"
echo "Running pre-hooks"

if [ $VERSION_TYPE = "release" ]; then
  ./packages/scripts/src/bash/ensure-master-is-clean.sh && yarn test:common:schema-locked
elif [ $VERSION_TYPE = "pre-release"  ]; then
  ./packages/scripts/src/bash/ensure-master-is-clean.sh && yarn test:common:schema-locked
elif [ $VERSION_TYPE = "test-release"  ]; then
  ./packages/scripts/src/bash/ensure-branch-is-clean.sh
else
  echo "Unknown VERSION_TYPE"
  exit 1
fi
