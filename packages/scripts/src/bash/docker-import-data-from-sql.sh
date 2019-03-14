source ./env/.backend

SOURCE="${SOURCE:-./data/dump.sql}"
DB_NAME="${DB_NAME:-$DB_DATABASE}"

while getopts d:f: option
 do
  case "${option}"
   in
    d) DB_NAME=${OPTARG};
  esac
  case "${option}"
   in
    f) SOURCE=${OPTARG};
  esac
 done


if [[ "$DB_NAME" != "dina_dev" && "$DB_NAME" != "dina_test" ]]; then
  echo "Aborting. Not allowed to import into db $DB_NAME"
  exit 1
fi

cat $SOURCE | docker exec -e PGPASSWORD=$DB_PASSWORD -i postgres psql -w -U $DB_USERNAME -d $DB_NAME -h 127.0.0.1 -p 5432 && exit 0

