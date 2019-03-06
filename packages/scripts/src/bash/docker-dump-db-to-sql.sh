source ./env/.backend

DB_NAME=$DB_DATABASE
TARGET="${TARGET:-./data/dump.sql}"

while getopts d:f: option
 do
  case "${option}"
   in
    d) DB_NAME=${OPTARG};;
  esac
  case "${option}"
   in
    f) TARGET=${OPTARG};
  esac
 done



echo "Exporting db with name: $DB_NAME to $TARGET"

rm -f $TARGET
docker exec -e PGPASSWORD=$DB_PASSWORD -i postgres pg_dump --clean -c -U $DB_USERNAME -d $DB_NAME -h $DB_URL > $TARGET
chmod 777 $TARGET

echo "Exported db success"