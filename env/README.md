# Env files

Work in progress

## .backend
Used by api and worker service and is generated from sample.backend

### Api variables
__API_PORT__ - The port used inside the docker container. Should be 80 to work with the proxy

__VIRTUAL_HOST__ - The virutual host used by the proxy


### Postgres integration
__DB_DATABASE__ - Name of postgres database (should be same as .postgres POSTGRES_DB)

__DB_PASSWORD__ - Password to posgres database (should be same as .postgres POSTGRES_PASSWORD)

__DB_URL__ - Url to postgres database. Should be postgres

__DB_USERNAME__ - Username to postgres database (should be same as .postgres DB_NAME)

### Elasticsearch integration
__ELASTICSEARCH_URL__ - The url to elasticsearch should be without http

### Keycloak integration

__KEYCLOAK\_ADMIN_ACTIVE__ - The keycloak admin variables are used by the server to connect to keycloak to for example list users.
__KEYCLOAK\_ADMIN_PASSWORD__ -See above

__KEYCLOAK\_ADMIN_USERNAME__ - See above

__KEYCLOAK\_ADMIN_USERNAME__ - See above

__KEYCLOAK\_AUTH\_BASE_URL__ - This is the url to keycloak that is used both for admin access and to veryfi user access

__KEYCLOAK\_REALM_NAME__ - Keycloak realm name used both for admin access and to verify user access.


### Other

__DEBUG__ - A string to cotnroller to log level. Should start with DINA. If only interested in info log level DINA:LOG_INFO* could be used. Support comma separated strings.

__NODE_ENV__ - This should always be set to production since development of the backend is performed outside docker container using another env file.

## .elasticsearch
Nothing so far

## .keycloak
__DB_ADDR__

__DB_DATABASE__

__DB_PASSWORD__

__DB_USER__

__KEYCLOAK_LOGLEVEL__

__KEYCLOAK_PASSWORD__

__KEYCLOAK_USER__

__NGINX_PORT__

__PROXY_ADDRESS_FORWARDING__

__TZ__

__VIRTUAL_HOST__

## .mysql


## .pgadmin

## .postgres

## .scripts

## .style

## .ui

## local.backend
