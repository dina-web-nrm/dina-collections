---
id: repository
title: Repository structure
sidebar_label: Repository structure
---

> TODO: Add more info about the packages

Here we describe the structure of the
[DINA-Collections](https://github.com/DINA-Web/dina-collections) repository.

The repo is a monorepo, because it makes it easy to manage dependencies between
different packages and versions: At any given time the repo's packages have to
be compatible with each other.

Another core principle is that it should never be necessary to use Node, npm or
yarn on the server. In a server environment we should only
[use Docker](./docker.md) and bash scripts.

## The root

The idea is to keep the root as small as possible and to have minimal
dependencies in it. Ideally the root should refer to other packages for all
functionality.

Aside from the packages, which are described in more detail below, the root
contains:

- **Certificates**: Used by the server (nginx) proxy, located in `./certs`.
- **CLI**: Commands made available through `package.json`, e.g. for
  installation, setup, tests, data import and deployment.
- **Configuration**: Environment variables used to configure different
  environments, located in `./env`.
- **Data**: Data used for import, including sample data that is checked in to
  source control, located in `./data`. When working with real collection data,
  it is uploaded to this folder on the server. The data structure needs to be
  refactored when handling more than one collection. This folder is mounted as a
  docker volume in production.
- **Docker compose files**: Configuration for docker-compose, used to start
  containers.
- **Continuous integration**: We use Travis CI and the configuration is
  described in `./travis.yml`.
- **Makefile**: Provides an interface to some scripts and docker-compose
  commands.
- **User files**: The folder `./userFiles` is where user-initiated data exports
  are saved. This folder is mounted as a docker volume in production.

In addition there are some standard files, e.g. README and configuration for
linter etc.

## Packages

This table gives an overview of the packages and what Docker images, if any,
they are used for. Each package that is used for an image has its own
Dockerfile.

| Name       | Docker image | Description                                                                                                                                                  |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| backend    | api          | Contains code for the api and worker services                                                                                                                |
| common     | -            | Contains shared JavaScript code, that can be used by backend, migrations and ui, as well as the the compiled version of the data model and API specification |
| dina-style | style        | Builds the CSS used in the UI and the documentation of the styling                                                                                           |
| docs       | docs         | Builds the [docusaurus](https://docusaurus.io/) documentation site (on which this page exists)                                                               |
| keycloak   | keycloak     | Contains configuration for keycloak                                                                                                                          |
| migrations | migrations   | Manages the SQL schema migrations (up and down) and is used for data import                                                                                  |
| models     |              | Contains the data model definitions                                                                                                                          |
| proxy      | proxy        | Contains configuration for the proxy                                                                                                                         |
| scripts    |              | Contains scripts in bash and JavaScript                                                                                                                      |
| ui         | ui           | Contains code for the ui service                                                                                                                             |

### [Backend](https://github.com/DINA-Web/dina-collections/tree/master/packages/backend)

[File tree](https://github.com/DINA-Web/dina-collections/blob/master/packages/backend/tree.md)

The backend includes different API services, with each service owning its own
data SQL schema needs. There are also different types of workers that do
different jobs. The api image is used both to start the API services and
workers.

### [Common](https://github.com/DINA-Web/dina-collections/tree/master/packages/common)

[File tree](https://github.com/DINA-Web/dina-collections/blob/master/packages/common/tree.md)

### [DINA-style](https://github.com/DINA-Web/dina-collections/tree/master/packages/dina-style)

### [Docs](https://github.com/DINA-Web/dina-collections/tree/master/packages/docs)

### [Keycloak](https://github.com/DINA-Web/dina-collections/tree/master/packages/keycloak)

### [Migrations](https://github.com/DINA-Web/dina-collections/tree/master/packages/migrations)

The migrations package imports the backend package and collects the SQL schema
requirements from the services. The migrations container is used to initiate
import of data and rebuilds of the search index, as well as database migrations.

### [Models](https://github.com/DINA-Web/dina-collections/tree/master/packages/models)

### [Proxy](https://github.com/DINA-Web/dina-collections/tree/master/packages/proxy)

The proxy is mounted as a docker volume.

### [Scripts](https://github.com/DINA-Web/dina-collections/tree/master/packages/scripts)

The scripts package could be considered the backend of the CLI. Some of the
areas that the scripts cover are:

- CI
- Data import/export
- DevOps (server status, deployment)

All scripts should be executed from the root folder.

### [Ui](https://github.com/DINA-Web/dina-collections/tree/master/packages/ui)

[File tree](https://github.com/DINA-Web/dina-collections/blob/master/packages/ui/tree.md)
