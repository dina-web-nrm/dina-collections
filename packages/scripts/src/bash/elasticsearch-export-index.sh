while getopts f:n: option
 do
  case "${option}"
   in
    f) FILE_BASE_PATH=${OPTARG};
  esac
  case "${option}"
   in
    n) INDEX_NAME=${OPTARG};
  esac
 done


if [ -z "$FILE_BASE_PATH" ]
then
   echo "usage: $0 -f <FILE_BASE_PATH> -n <INDEX_NAME>"
   exit 1
fi

if [ -z "$INDEX_NAME" ]
then
   echo "usage: $0 -f <FILE_BASE_PATH> -n <INDEX_NAME>"
   exit 1
fi



INDEX_PATH="$FILE_BASE_PATH.$INDEX_NAME"
INPUT="http://127.0.0.1:9200/$INDEX_NAME"
echo "Exporting specimen search index to $INDEX_PATH"

rm $INDEX_PATH

./packages/scripts/node_modules/.bin/elasticdump \
  --input=$INPUT \
  --output=$INDEX_PATH \
  --type=data

