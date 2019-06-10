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


echo "Importing search index to index $INDEX_NAME"


INDEX_PATH="$FILE_BASE_PATH.$INDEX_NAME"
INDEX_URL="http://127.0.0.1:9200/$INDEX_NAME"
DELETE_URL="http://127.0.0.1:9200/$INDEX_NAME/_delete_by_query"


curl -X POST $DELETE_URL -H 'Content-Type: application/json' -d'
{
 "query": {
     "match_all": {}
  }
}
'

./packages/scripts/node_modules/.bin/elasticdump \
  --input=$INDEX_PATH \
  --output=$INDEX_URL \
  --type=data
