ME=$(USER)

all:  up

setup-env:
	./scripts/create-env.sh

up:
	@docker-compose up -d

up-local:
	@docker-compose -f docker-compose.dev.yaml up -d

up-pgAdmin:
	@docker-compose -f docker-compose.dev.yaml up -d pgadmin

stop:
	@docker-compose stop

stop-local:
	docker-compose -f docker-compose.dev.yaml stop

rm:
	@docker-compose rm -vf

load-sample-data:
	@docker-compose -f docker-compose.data.yaml up loadData

load-local-sample-data:
	@docker-compose -f docker-compose.data-dev.yaml up loadData
