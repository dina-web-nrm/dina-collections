source ./env/.backend

rm -f ./data/dump.sql
docker exec -e PGPASSWORD=$DB_PASSWORD -i postgres pg_dump -c -U $DB_USERNAME -d $DB_DATABASE -h $DB_URL > ./data/dump.sql
chmod 777 ./data/dump.sql