---
id: terminology
title: Terminology
sidebar_label: Terminology
---

## REST terminology

| Term             | Example                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| url              | `https://alpha-api.dina-web.net:4444/todoapi/v0/todos/1?done=true&text=action` |
| protocol         | `https`                                                                        |
| host             | `alpha-api.dina-web.net`                                                       |
| domain           | `dina-web.net`                                                                 |
| subdomain        | `alpha-api`                                                                    |
| port             | `4444`                                                                         |
| path             | `/todoapi/v0/todos/1`                                                          |
| pathname         | `/todoapi/v0/todos/1`                                                          |
| resource path    | `/todos/1`                                                                     |
| version path     | `/v0`                                                                          |
| version          | `v0`                                                                           |
| service path     | `/todoapi`                                                                     |
| query string     | `?example=true`                                                                |
| query            | `example=true`                                                                 |
| path parameters  | `{id: '1'}`                                                                    |
| query parameters | `{done: true, text: 'action'}`                                                 |
| verb             | `GET`                                                                          |
| endpoint         | `GET /todoapi/v0/todos/1`                                                      |

## Core backend concepts

### Service

In the context of the backend, a service is an independent sub-API that is
responsible for a number of resources. These resources are made accessible by
exposing their operations at corresponding API endpoints. An example of a
service is the taxonomyService that exposes enpoints for the resources `taxon`
and `taxonName`.

In the current setup, all of these services run in the same process, but they
are independent and prepared to later be possible to run in separate API
instances in separate processes. They are independent in the sense that even
though they now share the same data stores, they do not have to do that.
Communication between services is done by a module called
[service interactor](#service-interator), which when they run in the same
process will communicate with the other services with a function call, but when
they run in different processes will use a REST call.

### serviceConfiguration

Service configurations is a central part of the backend. It lives in
`./src/serviceConfigurations` and contains configurations for each
[service](#service). Each serviceConfiguration contains
[resourceConfigurations](#resourceConfigurations). At bootstrap it will be
transformed to a [serviceSpecification](#serviceSpecification).

> TODO add reference to schema

### serviceSpecification

Created from a serviceConfiguration and contains resourceSpecifications. The
difference from a serviceConfiguration is the underlying
operationSpecifications.

### resourceConfiguration

A resource configuration is a configuration of a specific resource e.g.
`taxonName`. It contains a modelConfiguration and operationConfigurations. At
bootstrap it will be transformed to a resourceSpecification.

> TODO add reference to schema

### resourceSpecification

Created from a resourceConfiguration and contains modelSpecification and
operationSpecifications. The difference from a resourceConfiguration is the
underlying operationSpecifications.

### modelConfiguration

A model configuration is a configuration that specifies which type of model a
specific resource should be using. Depending on model, the data will either be
stored in elasticsearch, postgres or in memory. The different types of models
also have some other differences, apart from which data store is used.

At bootstrap it will be transformed to a modelSpecification.

### modelSpecification

Currently the same as modelConfiguration.

### operationConfiguration

An operation configuration is a configuration that specifies an operation type
e.g. `getOne` or `getMany` and it also contains operationSpecific configurations
and behaviors like which filters should be available in a getMany operation or
which preHooks should be executed before calling a controller.

At bootstrap it will be transformed to an operationSpecification.

### operationSpecification

An operationSpecification is created from an operationConfiguration using the
operationSpecification factories located in `./src/lib/operations`. Which
factory that is used is determined by the type specified in the
operationConfiguration.

### operation

The operation terminology comes from
[OpenApi](https://swagger.io/docs/specification/paths-and-operations/). It can
be described as a specific type of interaction with a resource. All operations
have a unique operationId and a unique endpoint.

Examples:

| operationType | resource | operationId  | endpoint                            |
| ------------- | -------- | ------------ | ----------------------------------- |
| getMany       | place    | placeGetMany | GET /api/locality/v01/places        |
| update        | place    | placeUpdate  | PATCH /api/locality/v01/places/{id} |
| create        | place    | placeCreate  | POST /api/locality/v01/places       |

The operationId is important because it allows the backend and frontend to
interact with different resources with a simple string id without keeping track
of potentially changing paths.

In the backend an operation is an object that contains an
[operationSpecification](#operationSpecification) and a controller
[controller](#controller).

```js
const operation = {
  controller,
  operationSpecification,
}
```

Each operation has one corresponding controller that is responsible for
performing the operation. Each operation also contains a schema for possible
interactions with the operation. For example, a getMany operation contains a
schema describing available filters and a create operation contains a schema
describing the format of the object. These schemas are used to generate an
[OpenApi documentation](https://swagger.io/docs/specification/about/) and the
documentation is available in the [API docs](/api/docs). The operations are
created as a part of the bootstrap process in [`createCore`](#createCore).

### controller

A controller is responsible for carrying out an operation by performing business
logic and pontentially doing cross-service interactions with the
[serviceInteractor](#serviceInteractor). In the end it usually interacts with an
underlying [model](#model). Each controller can only have one model but each
model can be used by several controllers.

Each controller is associated with an operation and during bootstrap each
controller is created from an operationSpecification based on the operationType.

> TODO add reference to schema
