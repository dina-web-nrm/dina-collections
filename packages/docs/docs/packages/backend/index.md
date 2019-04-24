---
id: index
title: Overview
sidebar_label: Overview
---

The backend package contains the [api app](./apps#api),
[worker app](./apps#worker) and [data import app](./apps#data). The code is run
on the server and interacts with databases. It can be run directly through Node
or it can be run through Docker. The Docker image contains all the backend code
for all apps. Which app is run is determined by which entry point is used when
starting the docker container. Similarly, when running in dev mode, different
apps are started by running different scripts in `package.json`.

The [apps](./apps) are located in `src/apps` and are started with
[bootstrap](./lib#bootstrap) methods located in `src/lib/bootstrap` that use
[libs](./lib) located in `src/lib`. The api is created based on the
[serviceConfigurations](./serviceConfigurations) located in
`src/serviceConfigurations`.

Below follows a tree representing the package structure.

<!--- import-file-src: ./packages/backend/tree.md -->
<!---
This content is imported from ./packages/backend/tree.md using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```bash
├── Dockerfile
├── LICENCE
├── README.md
├── nodemon.json
├── package.json
├── src
│   ├── apps
│   ├── info
│   ├── lib
│   ├── scripts
│   ├── serviceConfigurations
│   ├── tests
│   ├── tree.md
│   └── utilities
├── tree.md
└── yarn.lock

```

<!--- import-file-end -->

## Run backend

For instructions about how to start the different backend apps see
[setup for development](../../setup/setup-locally-for-development.md) and
[setup with docker](../../setup/setup-locally-with-docker.md).

## Core dependencies

The dependencies for the backend package is located in `./package.json`. Here
follows a short description of the most important dependencies.

| Dependency                                                                                              | Description                                                                                               |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [express](https://expressjs.com/)                                                                       | Express is a minimal and flexible Node.js web application framework, used as a web server and for routing |
| [sequelize](http://docs.sequelizejs.com/)                                                               | Sequelize is a promise-based Node.js ORM for Postgres (and other types of databases)                      |
| [elasticsearch](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html) | The official Node.js client for Elasticsearch                                                             |
| [keycloak-connect](https://www.npmjs.com/package/keycloak-connect)                                      | Node middleware to communicate with Keycloak, which is used for authentication                            |
| [common](./common)                                                                                      | A DINA Collections package used for functionality that is shared between UI and backend                   |

> TODO - fix link to common TODO - fix links from files to github
