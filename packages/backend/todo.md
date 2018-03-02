* rescope operatons and models to resources
* setupPostgres -> initializeSequelize
* connectorOptions -> operation
* scope models in controllers to service level
* merge transformOutput and createObjectResponse
* scope connectors on service level






























* Change name for hasOne to belongToOne
* Make sure latest version is fetched and not connected version
* Change name of operations to endpointFactories

endpoint (config) -> endpointFactory -> endpoint endpoint (in apiClient) ->
operation

apiClient

* api
* method
* client -> operationCaller (takes a operationCallerConfig)
* server -> operationHandler (takes a operationHandlerConfig)

createRouteFunction -> createOperationHandler({connector})

apiClient.call(operationId, options)

operationMiddleware - an express middleware calling a operationHandler

api - a set of resources and its related operationHandlers server - one or more
apis

* Move errorMiddleware, createRequestMiddleware and authMiddleware out of the
  route

* createRequestBuilder (in common) -> client requestBuilderOptions(operation)
* createEndpointConfig (in common) -> server
  createOperationHandlerConfig(operation)

in api

* One operation is to create a new user. this is done by calling the endpoint
  POST /users (verb + path). This operation has an id called operationId.

Operations are are specified in apis/{api}/resources/operations. operations
contains of 2 keys. definition and connector. definition has a type or a custom
function. connector has a type or a custom function. might not scope definition!

has a type that later will take an operationDefinitionFactory that together with
the core resource is used to create an operationDefinition (swagger spec). in
the operationSpecification the connector key can be used to connect the
operation to the database.

The connectors are initiated with a operationDefinition and all models.

In the operationMiddleware a operationHandlerConfig is created from the
operationDefinition and an initiated connector. Then the operationHandlerConfig
is used to create a operationHandler.

operationSpecification -> operation (described ) §

* an operation has an id and

* endpoints

operation - a combination of a path and a verb that usually manipulates a
resource requestHandler / requestCreator - a server-side / client-side function
that is responsible for performing an operation either by calling an api or
performing some action

Move operations to common repo to the build part (later might make sense to move
back). use type to assign default connector
