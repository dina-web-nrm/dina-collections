# Rest terminology

In rest we perform operations on resources. Its done by sending a request
through a verb to a url. The server then send a response.

### Operation

An interaction with a resource. Either a manipulation or a read. Not limited to
CRUD. An operation has a operationId.

### OperationId

A dina-unique identifier for an operation.

Examples: getTodos, createUsers, getTodo

### Resource

Examples: todo, user,

### Endpoint

Verb + url

* should be serviceUnique

Examples: GET /todos/1

### Verb

GET, POST, PATCH, DELETE...
