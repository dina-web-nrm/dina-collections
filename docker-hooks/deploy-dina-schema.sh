UPDATE_PATH=/var/dina-collections-docker

cd ${UPDATE_PATH} && docker-compose pull dina-schema && docker-compose up -d dina-schema
