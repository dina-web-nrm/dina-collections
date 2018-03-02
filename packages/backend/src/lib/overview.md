```bash
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
│       │   ├── index.html
│       │   └── index.js
│       ├── errorHandler.js
│       ├── keycloak
│       │   └── index.js
│       ├── logIncoming.js
│       └── pingRoute.js
├── connectors
│   ├── extractCustomControllersFromServices.js
│   ├── extractOperationsFromResources.js
│   ├── extractResourcesFromServices.js
│   └── index.js
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
│       │   └── versionedDocumentModel
│       ├── setupModels.js
│       └── syncModels.js
└── services
    ├── index.js
    ├── operationObjectFactory
    │   ├── createOperationObjectSpecification.js
    │   ├── index.js
    │   └── typeFactories
    │       ├── create.js
    │       ├── getMany.js
    │       ├── getOne.js
    │       ├── getRelationHasMany.js
    │       ├── getRelationHasOne.js
    │       ├── getVersion.js
    │       ├── getVersions.js
    │       ├── index.js
    │       ├── update.js
    │       ├── updateRelationHasMany.js
    │       ├── updateRelationHasOne.js
    │       └── utilities
    ├── resourceFactory
    │   ├── createOperationMap.js
    │   ├── createResourceSpecification.js
    │   └── index.js
    └── serviceFactory
        ├── createServiceSpecification.js
        └── index.js
```
