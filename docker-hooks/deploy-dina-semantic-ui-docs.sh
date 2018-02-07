UPDATE_PATH=/var/dina-collections

cd ${UPDATE_PATH} && docker-compose pull style && docker-compose up -d style
