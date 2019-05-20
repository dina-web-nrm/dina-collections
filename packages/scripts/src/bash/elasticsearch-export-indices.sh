FULL_PATH=$(dirname "$0")
FILE_PATH="${FILE_PATH:-./data/.index}"

while getopts f: option
 do
  case "${option}"
   in
    f) FILE_PATH=${OPTARG};
  esac
 done

$FULL_PATH/elasticsearch-export-index.sh -f $FILE_PATH -n searchspecimen
$FULL_PATH/elasticsearch-export-index.sh -f $FILE_PATH -n searchplace
$FULL_PATH/elasticsearch-export-index.sh -f $FILE_PATH -n searchagent
$FULL_PATH/elasticsearch-export-index.sh -f $FILE_PATH -n searchstoragelocation
