ME=$(USER)

all:  up

setup:
	./packages/scripts/src/bash/create-env.sh

up:
	@docker-compose up -d

stop:
	@docker-compose stop

rm:
	@docker-compose rm -vf

up-utils:
	@docker-compose -f docker-compose.dev-utils.yaml up -d

stop-utils:
	@docker-compose -f docker-compose.dev-utils.yaml stop

rm-utils:
	@docker-compose -f docker-compose.dev-utils.yaml rm -vf


load-sample-data:
	@docker-compose -f docker-compose.data.yaml up migrations
