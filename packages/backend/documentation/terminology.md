# Terminology

## Url terminology

### url
https://alpha-cm.dina-web.net/todoapi/v0/todos/1?example=true

### protocol 
https

### host
alpha-cm.dina-web.net

### domain
dina-web.net

### path
/todoapi/v0/todos/1?example=true

### pathname
/todoapi/v0/todos/1

### ?resourcePath
/todos/1?example=true

### ?resourcePathname
/todos/1

### ?versionPath
/v0

### version
v0

### ?basePath
/todoapi

### queryString
?example=true

### query
example=true

### pathParameters
{id: 1}

### queryParameters
{example: true}

### uri
?

## Service terminology
### Service
### Api
### Process
### Server

## Rest terminology
In rest we perform operations on resources. Its done by sending a request through a verb to a pathname. The server then send a response.
 
### operation
Its an interaction with a resource
An operation has an id operationId that should be dina unique. 

Examples: getTodos, createUsers, getTodo


### resource
Correspond to the type in json api

Examples: todo, user,

### endpoint
Verb + resourcePathname
- should be serviceUnique

Examples: GET /todos/1

### verbs
GET, POST, PATCH, DELETE...


## Application specific terminology - backend core



  ```bash
  backend
  ├── servers/
  │  ├── core/
  │  │   ├── config/
  │  │   └── index.js
  ├── services/
  │  ├── storageService/
  │  │   ├── resources
  │  │   │   └── physicalUnit/
  │  │   ├── models/
  │  │   ├── info/
  │  │   └── index.js
  │  ├── index.js
  │  │
  ├── lib/
  ```

backend
- apis
-- core
--- index.js
--- config
-- ..
- services
-- index.js
-- storageSevice
--- resources
---- physicalUnit
--- info
--- models
--- index.js
-- ...
- lib
-- api
--- coreRouterFactory
---- middlewareFactories
--- routerFactory (controllerFactories, models)
---- requestMiddlewareFactory (createController)


-- controllers
--- controllerFactories
--- registerControllerFactories(shared and specific)
-- models
--- modelFactories
--- registerModelFactories (specific)
-- services
--- serviceObjectFactory
--- resourceObjectFactory
--- operationObjectFactory
-- (requestHandlers)
-- connectors (db, services, jsonApi )
--- createRequestHandlers / createOperations
--- createConnector
--- {
      operationId: {
        pathname,
        verb,
        requestHandler,
      }
    }
--- index.js



### servers



### service
serviceObject : {
  basePath,
  resources, [array],
  resourceObjects,
  operationIdControllerMap?
}

createInitializedOperationControllerMap = ({serviceObject, models}) => {
	
} => {
  operationId: controllers
}


lib/resource/createResourceObject
lib/resource/createInternalOperationObject,
lib/resource/createOperationIdControllerMap
lib/resource/assignControllersToOperationIds,
lib/resource/determineControllerFromOperationInput,
lib/resource/createInitializedOperationIdControllerMap
 

### resource
-> resources
-> operationSpecifications
 {
 	operationType:
 	factory:
 	controller,
 } -> internalOperationObject, operationControllerMap
 
resourceObject : {
  relations,
  resource,
  resourcePlural,
  operationIds,
  internalOperationMap: {
    [operationId]: internalOperationObject,
  },
  operationIdControllerIdMap: {
    [operationId]: controller,
  },
}

createInitializedOperationControllerMap = ({serviceObject, models}) => {
	
} => {
  operationId: controllers
}


lib/resource/createResourceObject
lib/resource/createInternalOperationObject,
lib/resource/createOperationIdControllerMap
lib/resource/assignControllersToOperationIds,
lib/resource/determineControllerFromOperationInput,
lib/resource/createInitializedOperationIdControllerMap
 
 

### router
A part of the service responsible for routing the request to the correct requestHandler. Hosts routes.

### route
A requestHandler mounted at a specific path. 

ex) app.get('/ping, pingRequestHandler)

### requestMiddleware
A function that is invoked when a request targeting the specific endpoint is received. Is a middleware. Calls a requestHandler

### requestHandler
A function that is invoked when a request targeting the specific endpoint is received. Calls a controller

const requestHandler = createRequestHandler({ apiConfig, methodConfig, operationObject, controller })



### controller

### model



### operationDefinitionFactories

### operationTypeControllerMap


### operationObject 


## Application specific terminology - frontend

requestBuilder




const requestBuilder = createRequestBuilder({ apiConfig, methodConfig, operationObject })


operationControllerMap.


