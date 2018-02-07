UPDATE_PATH=/var/dina-collections-docker

cd ${UPDATE_PATH} && docker-compose pull api && docker-compose up -d api
