---
id: lib
title: Lib
sidebar_label: Lib
---

All the libs are located under `./src/lib`. Each lib contains a set of
functionality that makes sense to group. They all have an index.js file that is
the entrypoint to the lib and exports a method or methods that can be used to
interact with the lib.

## app

The app lib is responsible for creating an [express](https://expressjs.com/)
app.

The exported method `createApp` returns an instance of an
[express](https://expressjs.com/) app. It mounts, in the following order, a
number of express middlewares that are used for all received requests:

| middleware               | description                                                |
| ------------------------ | ---------------------------------------------------------- |
| responseTime             | middleware that adds response time to response             |
| log incoming             | logs information about incoming request                    |
| docs                     | middleware that exposes open api documentation under /docs |
| body parser              | express middleware to parse post body                      |
| authenticate             | authenticate middleware imported from [auth lib](#auth)    |
| logFrontendErrorEndpoint | exposes endpoint that logs error sent from frontend        |
| ping                     | exposes a get route under /ping                            |
| router                   | mounts provided routers ex serviceRouter                   |
| errorHandler             | middleware that handles request errors                     |

## auth

The auth lib is responsible for authentication and authorization. It does this
by interacting with Keycloak through
[keycloak connect](https://github.com/keycloak/keycloak-nodejs-connect).

It exports the method `createAuth` which creates the connection to Keycloak and
a middleware that is used by the [app lib](#app) to apply Keycloak
authentication and authorization

## bootstrap

The bootstrap lib is responsible for starting the different apps. Its used by
calling: [`./src/lib/bootstrap/bootstrapApi`](#bootstrapApi) to start the api
app, [`./src/lib/bootstrap/bootstrapWorker`](#bootstrapWorker) to start the
worker app or [`./src/lib/bootstrap/bootstrapData`](#bootstrapData) to start the
data app.

All apps bootstrap a core using
[`./src/lib/bootstrap/utilities/createCore`](#createCore) and then perform
app-specific bootstrapping.

To get an overivew of how bootstrapping works, you can start the different apps
and inspect the logs.

### createCore

`./src/lib/bootstrap/utilities/createCore`

Calling createCore is the first step in the bootstrapping of all the apps. The
core is a set of objects that are used through all applications. `createCore`
creates these objects by using different libs.

Below follows a table representing the different steps in `createCore`. All the
steps are function calls that result in an object. The name of resulting objects
is displayed in the object column and the lib that contains the used function in
the lib column. The terminology column provides a link to related terminology.

| object                | lib                                                         | terminology                                 |
| --------------------- | ----------------------------------------------------------- | ------------------------------------------- |
| config                | [config](#config)                                           | config                                      |
| serviceSpecifications | [serviceConfigurationManager](#serviceConfigurationManager) | serviceSpecifications serviceConfigurations |
| serviceInteractor     | [serviceInteractor](#serviceInteractor)                     | serviceInteractor                           |
| fileInteractor        | [fileInteractor](#fileInteractor)                           | fileInteractor                              |
| dataStores            | [dataStores](#dataStores)                                   | dataStores                                  |
| models                | [models](#models)                                           | models                                      |
| integrations          | [integrations](#integrations)                               | integrations                                |
| operations            | [operations](#operations)                                   | operations                                  |
| openApiSpec           | common/src/schemaInterface                                  | openApiSpec                                 |

After these steps `createCore` returns the following object:

```js
{
  config,
  fileInteractor,
  integrations,
  openApiSpec,
  operations,
  schemaInterface,
  serviceInteractor,
}
```

### bootstrapApi

The first step for bootstrapApi is to call `createCore`. Then it creates a
[worker](#worker). Depending on envVariables this worker is either active and
starts to look for jobs or its inactive and waiting to be started. bootstrapApi
then creates a [serviceRouter](#serviceRouter) that creates routes for each
operation. Then this serviceRouter is injected into [createApp](#createApp) that
creates an express app with needed express middlewares and mounts the
serviceRouter into the app. Finally bootstrapApi makes the app listen to a
specified port.

### bootstrapWorker

After calling `createCore` it creates a [worker](#worker).

### bootstrapData

After calling `createCore` it uses the [importer](#importer) to import data.

## config

The config lib is responsible for creating config objects that is used
throughout the application. This is done by the exported method `createConfig`.

Its created in bootstrap and then injected to where its needed. The config
object is created by reading env variables specified in LINK.

> TODO: Add link to schema and description of env-variables

## data

The data lib contains functionallity related to fetching and manipulating data.
It should be refactored.

> TODO: This is not a great lib - should be refactored

## dataStores

The dataStores lib is responsible for connecting to dataStores like postgres and
elasticsearch and also contains a simple in memory database implementation.
Exposes the method `createDataStores` that creates all datastores as well as
factories to create individual datastores

## errorLogger

Error logger is a lib that handles log errors using the log utility. It can also
use the Slack integration to send the id of the error to Slack. With this id it
is then possible to find the corresponding error in the logs.

## fileInteractor

File interactor makes it possible to interact with non-code files e.g. writing
and reading user-specific files.

## importer

The importer is used for importing data either to postgres or to elasticsearch.

## integrations

The integration lib is responsible for interacting with external services.

## models

The models lib contains factories for creating models of different types based
on a [modelSpecification](./terminology#modelspecification) which is based on a
[modelConfiguration](./terminology#modelconfiguration). Different model types
connect to different dataStores and they share a subset of the same interface.

It exposes a method `createModels` that, based on modelSpecifications, will
create models for all resources.

### Model types

| type                             | dataStore     | description                                        |
| -------------------------------- | ------------- | -------------------------------------------------- |
| sequelizeSimpleSqlModel          | postgres      | Storing data in columns in postgres table          |
| sequelizeDocumentModel           | postgres      | Storing data in postgres using single jsonb column |
| sequelizeNormalizedDocumentModel | postgres      | to be removed                                      |
| sequelizeViewDocumentModel       | postgres      | to be removed                                      |
| elasticsearchDocumentModel       | elasticsearch | Storing data in elasticsearch index                |
| inMemoryDocumentModel            | inMemory      | Storing data in memory                             |
| inMemoryViewDocumentModel        | inMemory      | potentially to be removed                          |

### Model methods

| method         | description                                                    | available in        |
| -------------- | -------------------------------------------------------------- | ------------------- |
| bulkCreate     | Create multiple records                                        | All models          |
| create         | Create a single record                                         | All models          |
| del            | Delete a single record                                         | All models          |
| getById        | Get a single record by id                                      | All models          |
| getOneWhere    | Get a single record based on conditions                        | All models          |
| getWhere       | Get multiple record based on conditions                        | All models          |
| synchronize    | Update the schema of the model (either mappings or sql schema) | All models          |
| update         | Update a single record                                         | All models          |
| empty          | Remove all model data                                          | Non postgres models |
| getCount       | Get number of records                                          | All models          |
| getViewMeta    | Get information about current elasticsearch alias \*           | Elasticsearch model |
| setupRelations | Setup sql relations in postgres models                         | Elasticsearch model |
| swap           | Update alias to point to other index \*                        | Elasticsearch model |

\* In elasticsearchDocumentModel it is possible to enable alias in the model
configuration by setting rebuildStrategy to true. This will make the
elasticsearch model create two underlying indexes where one at a time will be
active using an alias. This allows for doing complete rebuild of the inactive
index and then change the alias to allow for reindexing without downtime.

## operations

The operations lib contains factories for
[operationSpecifications](./terminology#operationspecification) and controllers
and exports a method `createOperations` to create all
[operations](./terminology#operation) for all resources.

### Operation types

| type               | associated verb | description                                    |
| ------------------ | --------------- | ---------------------------------------------- |
| bulkCreate         | POST            | Operation to create multiple records           |
| count              | GET             | Operation to get number of resource records    |
| create             | POST            | Create a single record                         |
| del                | DELETE          | Delete a single record                         |
| getMany            | GET             | Get multiple records based on filters          |
| getOne             | GET             | Get one record                                 |
| getRelationship    | GET             | Get a record relationship                      |
| query              | POST            | Get multiple records based on advanced filters |
| update             | PATCH           | Update a single record                         |
| updateRelationship | PATCH           | Update a relationship                          |
| importDataFromFile | POST            | Import data from a file                        |
| setJobFailed       | POST            | Mark a job as failed                           |
| setJobSuccess      | POST            | Mark a job as successful                       |
| startJob           | POST            | Mark a job as started                          |
| emptyView          | POST            | Delete all records                             |
| getViewMeta        | GET             | Get information about model meta               |
| rebuildView        | POST            | Will rebuild the collection (all records)      |
| rebuildView        | POST            | Will update the collection                     |

## serviceConfigurationManager

Used for interactions with the
[serviceConfigurations](./terminology#serviceconfiguration). Exposes methods for
creating a serviceSpecification from a serviceConfiguration and extract
modelSpecifications and operationSpecifications from serviceConfigurations.

## serviceInteractor

The service interactor is a module located in `./src/lib/serviceInteractor` that
is used throughout the backend to communicate with different
[services](#services). All interservice communication and communication between
e.g. workers and services is done with the serviceInteractor.

### Operation methods

It exposes methods corresponding to different operation types that combined with
a resource will make it possible to interact with an API endpoint with
corresponding operationId. For example, calling the serviceInteractor.getOne
with the resource taxonName will call the endpoint with the operationId
[taxonGetOne](api/docs#/taxonomyService/taxonGetOne). The parameters for the
request like body, pathParams and queryParams can be provided as an object.
Below follows an example:

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

Bellow follow some of the available methods (the CRUD methods). To see all
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

## serviceRouter

The service router lib creates API endpoints from operations by exposing an
operations controller at a specific path and verb in an express router.

## worker

The worker is a lib used mainly by the worker app and creates a worker that will
poll the jobs endpoint for new jobs and when new jobs is found do the job by
performing API operations specified in the job.
