FILE_PATH="${FILE_PATH:-./data/.searchSpecimen}"

while getopts f: option
 do
  case "${option}"
   in
    f) FILE_PATH=${OPTARG};
  esac
 done

# Later we might need to turn the data into a folder to also export mappings

echo "Exporting specimen search index to $FILE_PATH"

rm $FILE_PATH

./packages/scripts/node_modules/.bin/elasticdump \
  --input=http://127.0.0.1:9200/searchspecimen \
  --output=$FILE_PATH \
  --type=data
