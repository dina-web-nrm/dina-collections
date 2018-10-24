ME=$(USER)

all:  up

setup-env:
	./packages/scripts/src/bash/create-env.sh

up:
	@docker-compose up -d

up-pgAdmin:
	@docker-compose -f docker-compose.yaml up -d pgadmin

stop:
	@docker-compose stop

rm:
	@docker-compose rm -vf

load-sample-data:
	@docker-compose -f docker-compose.data.yaml up loadData
