source ./env/.backend

cat ./data/dump.sql | docker exec -e PGPASSWORD=$DB_PASSWORD -i postgres psql -w -U $DB_USERNAME -d dina_dev -h $DB_URL

