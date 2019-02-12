source ./env/.backend

DB_NAME=$DB_DATABASE

while getopts d: option
 do
  case "${option}"
   in
    d) DB_NAME=${OPTARG};;
  esac
 done

echo "Exporting db with name: $DB_NAME"

rm -f ./data/dump.sql
docker exec -e PGPASSWORD=$DB_PASSWORD -i postgres pg_dump -c -U $DB_USERNAME -d $DB_NAME -h $DB_URL > ./data/dump.sql
chmod 777 ./data/dump.sql

echo "Exported db success"