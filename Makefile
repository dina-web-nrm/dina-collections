ME=$(USER)

all:  up

setup-env:
	./scripts/create-env.sh

up:
	@docker-compose up -d

up-dev:
	@docker-compose -f docker-compose.dev.yaml up -d

up-pgAdmin:
	@docker-compose -f docker-compose.dev.yaml up -d pgadmin

stop:
	@docker-compose stop

stop-dev:
	docker-compose -f docker-compose.dev.yaml stop

rm:
	@docker-compose rm -vf

loadAll:
	@docker-compose -f docker-compose.data.yaml up loadData
