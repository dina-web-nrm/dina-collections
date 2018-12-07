ME=$(USER)

all:  up

setup:
	./packages/scripts/src/bash/create-env.sh
	./packages/scripts/src/bash/create-sample-data.sh

up:
	TAG=latest docker-compose up -d

stop:
	TAG=latest docker-compose stop

rm:
	TAG=latest docker-compose rm -vf

up-utils:
	TAG=latest docker-compose -f docker-compose.dev-utils.yaml up -d

stop-utils:
	TAG=latest docker-compose -f docker-compose.dev-utils.yaml stop

rm-utils:
	TAG=latest docker-compose -f docker-compose.dev-utils.yaml rm -vf

load-sample-data:
	TAG=latest docker-compose -f docker-compose.data.yaml up -d migrations
