```bash
../lib
├── api
│   ├── index.js
│   ├── middlewares
│   │   ├── authenticate.js
│   │   ├── decorateLocalsUserInput.js
│   │   ├── error.js
│   │   └── requestHandler.js
│   └── utilities
│       └── expressifyPath.js
├── app
│   ├── index.js
│   └── middlewares
│       ├── docs
│       ├── errorHandler.js
│       ├── keycloak
│       ├── logIncoming.js
│       └── pingRoute.js
├── connectors
│   ├── createConnector.js
│   ├── extractCustomControllersFromServices.js
│   ├── extractOperationsFromResources.js
│   ├── extractResourcesFromServices.js
│   ├── index.js
│   └── tmp.js
├── controllers
│   ├── create.js
│   ├── getMany.js
│   ├── getOne.js
│   ├── getRelationHasMany.js
│   ├── getRelationHasOne.js
│   ├── getVersion.js
│   ├── getVersions.js
│   ├── index.js
│   ├── relationshipsUtilities
│   │   ├── buildIncludeArray.js
│   │   └── extractRelationships.js
│   ├── transformations
│   │   ├── createArrayResponse.js
│   │   ├── createObjectResponse.js
│   │   ├── inputObject.js
│   │   ├── outputArray.js
│   │   └── outputObject.js
│   ├── update.js
│   ├── updateRelationHasMany.js
│   └── updateRelationHasOne.js
├── overview.md
├── postgres
│   ├── db
│   │   └── index.js
│   ├── index.js
│   └── models
│       ├── createModels.js
│       ├── createRelations.js
│       ├── factories
│       ├── setupModels.js
│       └── syncModels.js
├── services
│   ├── index.js
│   ├── operationFactory
│   │   ├── createOperationObjectSpecification.js
│   │   ├── index.js
│   │   └── typeFactories
│   ├── resourceFactory
│   │   ├── createOperationMap.js
│   │   ├── createResourceSpecification.js
│   │   └── index.js
│   └── serviceFactory
│       ├── createServiceSpecification.js
│       └── index.js
└── tree.md

20 directories, 50 files

```