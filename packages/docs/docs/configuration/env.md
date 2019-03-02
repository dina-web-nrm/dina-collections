---
id: env
title: Environmental variables
sidebar_label: Env variables
---

# Env files

Work in progress

## .backend

Used by api and worker service and is generated from sample.backend

### Api variables

**API_PORT** - The port used inside the docker container.
Should be 80 to work with the proxy

**VIRTUAL_HOST** - The virutual host used by the proxy

### Postgres integration

**DB_DATABASE** - Name of postgres database (should be same as .postgres POSTGRES_DB)

**DB_PASSWORD** - Password to posgres database (should be same as .postgres POSTGRES_PASSWORD)

**DB_URL** - Url to postgres database. Should be postgres

**DB_USERNAME** - Username to postgres database (should be same as .postgres DB_NAME)

### Elasticsearch integration

**ELASTICSEARCH_URL** - The url to elasticsearch should be without http

### Keycloak integration

**KEYCLOAK_ADMIN_ACTIVE** The keycloak admin variables
are used by the server to connect to keycloak to for example list users.
**KEYCLOAK_ADMIN_PASSWORD** -See above

**KEYCLOAK_ADMIN_USERNAME** - See above

**KEYCLOAK_ADMIN_USERNAME** - See above

**KEYCLOAK_AUTH_BASE_URL** - This is the url to keycloak that is used
both for admin access and to veryfi user access

**AUTH_BASE_URL** - Depricated. Will be removed in next release

**KEYCLOAK_REALM_NAME** - Keycloak realm name used both for admin access
and to verify user access.

### Other

**DEBUG** - A string to cotnroller to log level. Should start with DINA.
If only interested in info log level DINA:LOG_INFO\* could be used.
Support comma separated strings.

**NODE_ENV** - This should always be set to production since development
of the backend is performed outside docker container using another env file.

## .elasticsearch

Nothing so far

## .keycloak

**DB_ADDR** TBA

**DB_DATABASE** TBA

**DB_PASSWORD** TBA

**DB_USER** TBA

**KEYCLOAK_LOGLEVEL** TBA

**KEYCLOAK_PASSWORD** TBA

**KEYCLOAK_USER** TBA

**NGINX_PORT** TBA

**PROXY_ADDRESS_FORWARDING** TBA

**TZ** TBA

**VIRTUAL_HOST** TBA

## .mysql

## .pgadmin

## .postgres

## .scripts

## .style

## .ui

## local.backend
