ME=$(USER)

all:  up

setup:
	./packages/scripts/src/bash/create-env.sh
	./packages/scripts/src/bash/create-sample-data.sh


# Run with env variable tag version like: TAG='v0.1.1' make up
up:
	docker-compose up -d

# Run with env variable tag version like: TAG='v0.1.1' make stop
stop:
	docker-compose stop

# Run with env variable tag version like: TAG='v0.1.1' make rm
rm:
	docker-compose rm -vf

# Run with env variable tag version like: TAG='v0.1.1' make up-utils
up-utils:
	docker-compose -f docker-compose.dev-utils.yaml up -d

# Run with env variable tag version like: TAG='v0.1.1' make stop-utils
stop-utils:
	docker-compose -f docker-compose.dev-utils.yaml stop

# Run with env variable tag version like: TAG='v0.1.1' make rm-utils
rm-utils:
	docker-compose -f docker-compose.dev-utils.yaml rm -vf

# Run with env variable tag version like: TAG='v0.1.1' make load-sample-data
load-sample-data:
	./packages/scripts/src/bash/docker-import-data-from-sample.sh -t $(TAG)
