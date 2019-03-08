---
id: services
title: Services overview
sidebar_label: Services overview
---

This image gives an overview of the services that are used in a production
environment and the docker-compose files we use to define them.

![Services overview](/img/service-overview.svg)

_\*api is an image providing entry points to start the API services and
different workers_

_\*\*migrations is an image providing entry points for different migration
related services_

Note that in development it is easier to get hot module/live reload when running
backend and UI in Node, outside of Docker.

## Services

| Name              | Image source package | Purpose                                |
| ----------------- | -------------------- | -------------------------------------- |
| api               | backend              | Serve the API                          |
| baseWorker        |   backend            | Do jobs                                |
| searchIndexWorker |   backend            | Do search index jobs                   |
| docs              |   docs               | Serve this documentation               |
| style             |  dina-style          | Serve style documentation              |
| ui                |   ui                 | Serve the UI                           |
| import            |   migrations         | Import from data files                 |
| migrateLatest     |  migrations          | Migrate SQL schema to latest           |
| migrateOne        |  migrations          | Run the next SQL schema migration      |
| migrateUndoOne    |  migrations          | Undo the previous SQL schema migration |
| rebuildSearch     |   migrations         | Rebuild the elasticsearch index        |
| elasticsearch     | external             | Store search index data                |
| keycloak          |   external           | Authenticate users                     |
| kibana            |   external           | Explore elasticsearch data             |
| mysql             |  external            | Store keycloak data                    |
| pgadmin           |   external           | Explore postgres data                  |
| postgres          |  external            | Store data                             |
| proxy             |  external            | Route requests                         |

## Volumes

There are five volumes:

- **data** (data for import, sample or real)
- **es_data** (elasticsearch)
- **mysql-keycloak-accounts**
- **postgres_data**
- **userFiles** (data exports requested by user)

`data` and `userFiles` are declared for each service that might use them,
whereas the others are declared globally in the docker-compose files.

## docker-compose files

There are three root docker-compose files and one override file:

- **docker-compose.yaml**: Specifies all services and volumes that should run in
  a production environment
- **docker-compose.ci.yaml**: Specifies overrides for CI compatibility
- **docker-compose.data.yaml**: Specifies services used for SQL schema
  migrations and data import. It is not necessary to interact directly with
  these commands, since the [CLI](./repository.md#the-root) has commands for it.
- **docker-compose.dev-utils.yaml**: Specifies services to explore the data
