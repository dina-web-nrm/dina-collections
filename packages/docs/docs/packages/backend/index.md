---
id: index
title: Backend
sidebar_label: Backend
---

## Package overview

The backend package primarily contains the code necessary for running the
[api](#api) app but it also contains code for [worker](#worker) and
[data import](#data). The code is run on the server and interacts with
databases. It can be run directly through node or it can be run through docker.
The docker image contains all the backend code and all apps. Which app is run is
are determined by which entry point is used when starting the docker container.
Similar when running in dev mode different apps are started by running different
scripts in package.json.

### Run backend

For instructions about how to start the different backend apps see
[setup](../../setup/index.md). For instructions about configuration see [configuration](../../configuration/index.md).

### File structure overview

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
The entrypoints for the backend is located in `./src/apps`. For the api entrypoint platform functionality functionallity from `./src/lib` is used together with service specification and service specific functionallity from `./src/services` to run an api.


### Layer overview

When running the api consists of a number of layers that can be divided into
web app -> routes -> controllers -> models -> data stores.

##### Web app
The web app is an [express](https://expressjs.com/en/4x/api.html#express) app. It listens to a port and hosts the application [routes](#routes). For details see [App](#app) in the lib section.

##### Routes
The application routes mapps the incoming requests, based on verb and url. Each route is connected to a corresponding controller. This is done with [express routes](https://expressjs.com/en/4x/api.html#router).

##### Controllers
The controllers performs validation of input and output, business logic and calls the models. 

##### Models

> TODO - Write

##### Data stores

> TODO - Write


> TODO - Expand

### Core dependencies
The dependencies for the backend package is located in `./package.json`. Here follow a short description of the most important dependencies.

| dependency | description | usage |
| -------- | ---------------- | ---------------- |
| [express](https://expressjs.com/) | Express is a minimal and flexible Node.js web application framework | Express is used as a webserver and for routing | 
| [sequelize](http://docs.sequelizejs.com/) | Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. | For communicating with postgres database |
| [elasticsearch](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html) | The official Node.js client for Elasticsearch. | For communicating with elasticsearch |
| [keycloak-connect](https://www.npmjs.com/package/keycloak-connect) | Node middleware to communicate with keycloak | For communicating with keycloak for authentication |
| [common](./common) | A dina package used for functionallity that is shared between UI and backend | Various shared functionallity |

> TODO - fix link to common
> TODO - fix links from files to github

## Apps

The different available apps are specified in `./src/apps`. From here the apps
will be bootstraped calling different bootstrap functions. A first step for
these bootstrap function is to create a configuration, based on env variables,
that will be used throughout the app. The config is created by the config module
located in `./src/lib/config`.

Used env variables are explained in
[env documentation](../configuration/env.md). Even if they are described as
separate apps they use the same codebase.

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

| service | resource 
| -------- | ---------------- |
| [agent](api/docs#/agentService) | [normalizedAgent](/ui/dataModelDocs/current/models/normalizedAgent) |
| [auth](api/docs#/authService) | - |
| [curatedList](api/docs#/curatedListService) | [causeOfDeathType](/ui/dataModelDocs/current/models/causeOfDeathType) |
| [curatedList](api/docs#/curatedListService) | [customTaxonNameType](/ui/dataModelDocs/current/models/customTaxonNameType) |
| [curatedList](api/docs#/curatedListService) | [establishmentMeansType](/ui/dataModelDocs/current/models/establishmentMeansType) |
| [curatedList](api/docs#/curatedListService) | [featureType](/ui/dataModelDocs/current/models/featureType) |
| [curatedList](api/docs#/curatedListService) | [identifierType](/ui/dataModelDocs/current/models/identifierType) |
| [curatedList](api/docs#/curatedListService) | [preparationType](/ui/dataModelDocs/current/models/preparationType) |
| [export](api/docs#/exportService) | [exportJob](/ui/dataModelDocs/current/models/exportJob) |
| [history](api/docs#/historyService) | [resourceActivity](/ui/dataModelDocs/current/models/resourceActivity) |
| [identifier](api/docs#/identifierService) | [catalogNumber](/ui/dataModelDocs/current/models/catalogNumber) |
| [job](api/docs#/jobService) | [job](/ui/dataModelDocs/current/models/job) |
| [migration](api/docs#/migrationService) | [dataModelMigrationLog](/ui/dataModelDocs/current/models/dataModelMigrationLog) |
| [place](api/docs#/placeService) | [place](/ui/dataModelDocs/current/models/place) |
| [search](api/docs#/searchService) | [searchSpecimen](/ui/dataModelDocs/current/models/searchSpecimen) |
| [specimen](api/docs#/searchService) | [specimen](/ui/dataModelDocs/current/models/specimen) |
| [status](api/docs#/statusService) | - |
| [storage](api/docs#/storageService) | [physicalObject](/ui/dataModelDocs/current/models/physicalObject) |
| [storage](api/docs#/storageService) | [storageLocation](/ui/dataModelDocs/current/models/storageLocation) |
| [taxonomy](api/docs#/taxonomyService) | [taxon](/ui/dataModelDocs/current/models/taxon) |
| [taxonomy](api/docs#/taxonomyService) | [taxonName](/ui/dataModelDocs/current/models/taxonName) |


## Lib

### App

### Auth

### Bootstrap

The bootstrap lib is responsible for starting the different apps. Most of bootstrapping is shared between apps but for example its only the api app that starts listening to a port. The bootstrapping is done in separate steps explained below. For details see the src in `./src/lib/bootstrap`.

#### 1. Create config
The first step is to create a system-wide config using the [config library](#config). It creates an object based on provided env-variables. This object is later injected to different parts of the application.

#### 2. Create service configuration interface
It creates a service configuration interface with the services the api is intended to run (right now all services). 

#### 3. Connects to datastores and initialzes data models


#### 4. Initializes serviceOperations


#### 5. Perform application specific bootstrapping
The the case of the api it setup one route for each operation



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

### Service configuration interface
