UPDATE_PATH=/var/dina-collections-docker

cd ${UPDATE_PATH} && docker-compose pull ui && docker-compose up -d ui
