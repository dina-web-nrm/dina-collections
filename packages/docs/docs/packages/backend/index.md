---
id: index
title: Backend
sidebar_label: Backend
---

## Package overview

The backend package primarily contains the code necessary for running the [api app](#api) but it also contains code for [worker](#worker)  and [data import](#data). The code is run on the server and interacts with databases. It can be run directly through
node or it can be run through docker. The docker image contains all the backend
code and all apps. Which app is run is are determined by which entry point is
used when starting the docker container. Similar when running in dev mode
different apps are started by running different scripts in package.json.

For instructions about how to start the api see setup 
> TODO Add link to setup

Below follow an overview of the folderstructure:

### File structure

```bash
├── Dockerfile
├── LICENCE
├── README.md
├── documentation
│   └── terminology
├── index.js
├── nodemon.json
├── package.json
├── src
│   ├── apps
│   ├── info
│   ├── lib
│   ├── scripts
│   ├── services
│   ├── tests
│   ├── tree.md
│   └── utilities
├── tree.md
├── yarn-error.log
└── yarn.lock

```

### Architecture idea

The backend consists of a number of layers that roughly can be divided into
routes -> controllers -> models -> data stores.

##### Routes

> TODO - Write

##### Controllers

> TODO - Write

##### Models

> TODO - Write

##### Data stores

> TODO - Write

<id="worker" />

> TODO - Expand

### Core dependencies

> TODO - write description about express, sequelize, elasticsearch, keycloak?

## Apps

The different available apps are specified in ./src/apps. From here the apps
will be bootstraped calling different bootstrap functions. A first step for
these bootstrap function is to create a configuration, based on env variables,
that will be used throughout the app. The config is created by the config module
located in ./src/lib/config. Used env variables are explained in TODO - add link
TODO - fix the structure to not be scoped under env. Even if they are described
as separate apps they use the same codebase.

### Api

The api is responsible for exposing the databases, through a json api, to the ui
or other services. The exposed api is a [json-api](https://jsonapi.org/)
compliant api and is documented using
[OpenApi](https://swagger.io/docs/specification/about/). For full api
documentation visit [api docs](/api/docs).

The api consists of a number of sub apis, atm called [services](#services). In
the current configuration all of these sub apis run in the same process but they
are independent and its prepared to later be able to run the sub apis in
separate processes. They are independent in the sense that even if they now
share the same datastores they dont need to to that. Communication between
sub-apis is used by a module called [service interactor](#service-interator)
that when they run in the same process will communicated with the other sub-apis
with a function call but when they run in different processes use a rest call.

In dev mode its possible (and default) to configure the API to also run a
[worker](#worker) (convinient to not have to run too many processes)


### Worker

The worker is responsible for performing offline jobs. The worker app starts a
worker that will poll the job table to find jobs to be done. Starting,
succeeding and failing a job will be logged to the job table. Its possible to
configure what types of job each worker should do. This makes it possible to
have dedicated workers that does more complex jobs like re-indexing the whole
specimen search index in elasticsearch and at the same time have another worker
that can before smaller jobs that are expected to be finised faster (like
reindexing a single specimen). Right now each worker run a non exposed version
of the api to communicate with the database. When interacting with the api it is
using the [service interactor](#service-interator). Later it will be possible
for the worker to not run its own api but instead use the service interactor to
communicate with the main api or another dedicated internal api.

### Data

The data app is responsible for importing data and serve as an entrypoint for
rebuilding the specimen search index. This app differ from the worker and the
api because it exits after its done with its task while the api and the worker
is ongoing processes.

## Services

> TODO - likely this naming is not good. Should be called apis or something else
> TODO - Add table

### Agent service

The agent service is responsible for managing
[normalizedAgents](/ui/dataModelDocs/current/models/normalizedAgent). It exposes
a number of endpoints under /api/agent. Inspect the
[Agent api documentation](api/docs#/agentService) for details.

### ...The rest of the services

## Lib

### Auth

### Bootstrap

### Config

### Connectors

### Controllers

### Data

> TODO: This is not a great lib - should be refactored

### Data stores

### Integrations

### Jobs

### Models

### Operations

### Other libs

(potentiall move these to utilities) errorLogger, fileInteractor, importer,
statistics

<id="service-interator" />

### Service Interactor

The service interactor is a module located in ./src/lib/serviceInteractor that
is used throughout the backend to communicate with different
[services](#services). All interservice communication and communication between
ex workers and services is done with the serviceInteractor.

#### Operation methods

It exposes methods corresponding to different api operations that combined with
a resource will make it possible to interact with an api enpoint with
corresponding operationId. Ex calling the serviceInteractor.getOne with the
resource taxonName. Will call the endpoint with the operationId
[taxonGetOne](api/docs#/taxonomyService/taxonGetOne). The parameters for the
request like body, pathParams and queryParams can be provided as an object.
Below follow an example:

```js
return serviceInteractor
  .getOne({
    request: {
      pathParams: {
        id: 1,
      },
    },
    resource: 'taxon',
  })
  .then(({ data: taxon }) => {})
```

Right now the serviceInteractor makes a function call to the controller
responsible for carrying out the operation but later this can instead be done
through a rest call.

Bellow follow some of the available methods (the crud methods). To see all
available methods inspect the source code:

| function | example resource | example operation id                                         |
| -------- | ---------------- | ------------------------------------------------------------ |
| create   | specimen         | [specimenCreate](api/docs#/specimenService/specimenCreate)   |
| del      | specimen         | [specimenDel](api/docs#/specimenService/specimenDel)         |
| getMany  | specimen         | [specimenGetMany](api/docs#/specimenService/specimenGetMany) |
| getOne   | specimen         | [specimenGetOne](api/docs#/specimenService/specimenGetOne)   |
| query    | specimen         | [specimenQuery](api/docs#/specimenService/specimenQuery)     |
| update   | specimen         | [specimenUpdate](api/docs#/specimenService/specimenUpdate)   |

#### call and detachedCall

Apart from exposing the operation methods it also exposes the methods call and
detachedCall. When using .call() you can provide any valid operationId instead
of specifying the resource.

```js
return serviceInteractor
  .call({
    request: {
      pathParams: {
        id: 1,
      },
    },
    operationId: 'specimenGetOne',
  })
  .then(({ data: specimen }) => {})
```

.detachedCall() have the same function signature as the call method but will
instead of performing the call directly create a job with the provided params.
Later (if active) a worker will carry out the requested request.

### Service router

### Services
