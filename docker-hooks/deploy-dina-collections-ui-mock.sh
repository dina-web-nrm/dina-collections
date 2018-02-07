UPDATE_PATH=/var/dina-collections

cd ${UPDATE_PATH} && docker-compose pull ui-mock && docker-compose up -d ui-mock
