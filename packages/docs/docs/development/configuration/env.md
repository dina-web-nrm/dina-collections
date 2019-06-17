---
id: env
title: Environment variables
sidebar_label: Environment variables
---

# Env files

Below you can see the sample env files with documentation

## .backend

These env variables are used to configure [backend](../packages/backend) and is
located in ./env/.backend after setting up the system. The example values below
are created when running
[Setup with docker](../../setup/setup-locally-with-docker) and comes from
`./env/sample/backend`. When
[setting up for development](../../setup/setup-locally-for-development) the
values `./env/sample/backend.dev` is used instead.

<!--- import-file-src: ./env/sample/backend -->
<!--- processor: wrap-in-bash-code-block -->
<!---
This content is imported from ./env/sample/backend using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```bash
# The port the api will be exposed at.
# Should be 80 when running in docker and 4444 in development
API_PORT=80

# The name of the postgres database
DB_DATABASE=dina_production

# The password to postgres database
# This should be replaced with a secret password
# Should be the same as POSTGRES_PASSWORD in .postgres env file
DB_PASSWORD=mysecretpassword

# Postgres url
# Should be postgres in docker otherwise ex 127.0.0.1:5432
DB_URL=postgres

# Username to postgres
# This can be replaced with an other username
DB_USERNAME=postgres

# Pattern to control debug for logging
# see https://www.npmjs.com/package/debug
DEBUG=DINA*

# Url to elasticsearch.
# Should be elasticsearch:9200 in docker otherwise ex 127.0.0.1:9200
ELASTICSEARCH_URL=elasticsearch:9200

# Determine if keycloak admin integration should be active
KEYCLOAK_ADMIN_ACTIVE=false

# Password to keyckloak admin
KEYCLOAK_ADMIN_PASSWORD=admin

# Username to keyckloak admin
KEYCLOAK_ADMIN_USERNAME=admin

# Base url to keycloak
# Should be http://keycloak:8080 in docker otherwise exhttp://127.0.0.1:3000
KEYCLOAK_AUTH_BASE_URL=http://keycloak:8080

# Keycloak realm
KEYCLOAK_REALM_NAME=dina

# The NODE_ENV to be used.
# Should be production when running in docker otherwise development
NODE_ENV=production

# ?
SERVER_ALIAS=local

# Set true to enable slack integration
# When set to true SLACK_ERROR_WEBHOOK and SLACK_WARNING_WEBHOOK should be set
SLACK_ACTIVE=false

# When slack is active this webook will be used to send error messages to slack
SLACK_ERROR_WEBHOOK=url

# When slack is active this webook will be used to send warning messages to slack
SLACK_WARNING_WEBHOOK=url

# Virtual host used by the proxy
# See: https://github.com/jwilder/nginx-proxy
VIRTUAL_HOST=local-api.dina-web.net
```

<!--- import-file-end -->

## .elasticsearch

Right now no env variables are used to configure elasticsearch

<!--- import-file-src: ./env/sample/elasticsearch -->
<!--- processor: wrap-in-bash-code-block -->
<!---
This content is imported from ./env/sample/elasticsearch using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```bash

```

<!--- import-file-end -->

## .keycloak

These env variables are used to configure keycloak and is located in
./env/.keycloak after setting up the system

<!--- import-file-src: ./env/sample/keycloak -->
<!--- processor: wrap-in-bash-code-block -->
<!---
This content is imported from ./env/sample/keycloak using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```bash
# For details of parameters consult keycloak documentation
# https://hub.docker.com/r/jboss/keycloak/

# Name of the mysql database.
# Its recommended to set it to keycloak
# Should be the same as the MYSQL_DATABASE in ./mysql
DB_DATABASE=keycloak

# Db mysql password.
# Should be changed in production
# Should be the same as the MYSQL_PASSWORD in ./mysql
DB_PASSWORD=password

# The db user for keycloak.
# Its recommended to set it to keycloak
# Should be the same as the MYSQL_USER in ./mysql
DB_USER=keycloak

# Path to initial import.
KEYCLOAK_IMPORT=/opt/jboss/keycloak/dev-export.json

# Keycloak log level
KEYCLOAK_LOGLEVEL=DEBUG

# Keycloak admin interface password.
# Should be changed in production.
KEYCLOAK_PASSWORD=admin

# Keycloak admin interface user.
KEYCLOAK_USER=admin

# Port used inside the docker container.
# Should be 8080
NGINX_PORT=8080

# Should be true. Inspect keycloak docs for more information
PROXY_ADDRESS_FORWARDING=true

# Should be set to relevant timezone. Inspect keycloak docs for more information
TZ=Europe/Stockholm

# Virtual host used by the proxy
# See: https://github.com/jwilder/nginx-proxy
VIRTUAL_HOST=local-docs.dina-web.net

```

<!--- import-file-end -->

## .mysql

These env variables are used to configure mysql (used by keycloak) and is
located in ./env/.mysql after setting up the system

<!--- import-file-src: ./env/sample/mysql -->
<!--- processor: wrap-in-bash-code-block -->
<!---
This content is imported from ./env/sample/mysql using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```bash
# Root password
# Should be changed to something secret in production
MYSQL_ROOT_PASSWORD=root

# Name of the mysql database.
MYSQL_DATABASE=keycloak

# The user that keycloak will use
MYSQL_USER=keycloak

# The password to the keycloak user
MYSQL_PASSWORD=password

```

<!--- import-file-end -->

## .pgadmin

These env variables are used to configure pgadmin and is located in
./env/.pgadmin after setting up the system

For details see: [pgadmin4](https://hub.docker.com/r/dpage/pgadmin4/)

<!--- import-file-src: ./env/sample/pgadmin -->
<!--- processor: wrap-in-bash-code-block -->
<!---
This content is imported from ./env/sample/pgadmin using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```bash
PGADMIN_DEFAULT_EMAIL=user@domain.com
PGADMIN_DEFAULT_PASSWORD=SuperSecret

```

<!--- import-file-end -->

## .postgres

These env variables are used to configure postgres and is located in
./env/.postgres after setting up the system

<!--- import-file-src: ./env/sample/postgres -->
<!--- processor: wrap-in-bash-code-block -->
<!---
This content is imported from ./env/sample/postgres using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```bash
# Default database name
# The backend will creates its own databases so this can be kept as postgres
DB_NAME=postgres

# Db password
DB_PASS=mysecretpassword

# Same as DB_PASS
# Later only DB_PASS should be used but for now this also needs to be set
POSTGRES_PASSWORD=mysecretpassword

# Same as DB_NAME
# Later only DB_NAME should be used but for now this also needs to be set
POSTGRES_DB=postgres
```

<!--- import-file-end -->

## .scripts

These env variables are used to configure [scripts](../packages/scripts) and is
located in ./env/.scripts after setting up the system

<!--- import-file-src: ./env/sample/scripts -->
<!--- processor: wrap-in-bash-code-block -->
<!---
This content is imported from ./env/sample/scripts using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```bash
# These configurations makes it possible to use the remote scripts
# in root package.json
#
# They follow the same format for the different environments
# * PRODUCTION
# * STAGE
# * TEST
# * DEMO

# SERVER_HOST
# Ip the server

# SERVER_USER
# The user used when logging in with ssh

# SERVER_KEY_FILE
# The key file used when logging in with ssh

# SERVER_REPO_ROOT
# Full path to the root of the repository in the server

PRODUCTION_SERVER_HOST=82.196.9.188
PRODUCTION_SERVER_USER=anton
PRODUCTION_SERVER_KEY_FILE=/.ssh/id_rsa
PRODUCTION_SERVER_REPO_ROOT=/home/dina/repos/dina-collections

STAGE_SERVER_HOST=82.196.9.188
STAGE_SERVER_USER=anton
STAGE_SERVER_KEY_FILE=/.ssh/id_rsa
STAGE_SERVER_REPO_ROOT=/home/dina/repos/dina-collections

TEST_SERVER_HOST=82.196.9.188
TEST_SERVER_USER=anton
TEST_SERVER_KEY_FILE=/.ssh/id_rsa
TEST_SERVER_REPO_ROOT=/home/dina/repos/dina-collections

DEMO_SERVER_HOST=82.196.9.188
DEMO_SERVER_USER=anton
DEMO_SERVER_KEY_FILE=/.ssh/id_rsa
DEMO_SERVER_REPO_ROOT=/home/dina/repos/dina-collections


# The local server host
# Should be set to 127.0.0.1 
LOCAL_SERVER_HOST=127.0.0.1
```

<!--- import-file-end -->

## .style

These env variables are used to configure [style](../packages/style) and is
located in ./env/.style after setting up the system

<!--- import-file-src: ./env/sample/style -->
<!--- processor: wrap-in-bash-code-block -->
<!---
This content is imported from ./env/sample/style using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```bash
# Should be 80 when running in docker and otherwise any valid port
NGINX_PORT=80

# Virtual host used by the proxy
# See: https://github.com/jwilder/nginx-proxy
VIRTUAL_HOST=local-style.dina-web.net
```

<!--- import-file-end -->

## .ui

These env variables are used to configure [ui](../packages/ui) and is located in
./env/.ui after setting up the system

<!--- import-file-src: ./env/sample/ui -->
<!--- processor: wrap-in-bash-code-block -->
<!---
This content is imported from ./env/sample/ui using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```bash
# Url to the api.
# Should be http://api in docker
# When not running in docker this is not used
# but hardcoded to 127.0.0.1:4444
NGINX_API_BASE_URL=http://api

# Url to keycloak.
# Should be http://keycloak:8080 in docker
# When not running in docker this is not used
# but hardcoded to 127.0.0.1:4444
NGINX_AUTH_BASE_URL=http://keycloak:8080

# Should be 80 when running in docker
# When not running in docker this is not used
# but hardcoded to 3000
NGINX_PORT=80

# When set to true ui will not authenticate the user
# Should only be set to true in development
REACT_APP_DISABLE_AUTH=false

# Url pointing to corresponding api for link purpose
REACT_APP_EXTERNAL_URL_API=https://dina-api.nrm.se

# Url pointing to corresponding docs for link purpose
REACT_APP_EXTERNAL_URL_DOCS=https://dina-docs.nrm.se

# Url pointing to corresponding style documentation for link purpose
REACT_APP_EXTERNAL_URL_STYLE=https://dina-style.nrm.se

# Virtual host used by the proxy
# See: https://github.com/jwilder/nginx-proxy
VIRTUAL_HOST=local-ui.dina-web.net


```

<!--- import-file-end -->
