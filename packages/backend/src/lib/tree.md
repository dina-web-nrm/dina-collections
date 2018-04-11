# Tree for lib
## Tree
```bash
├── app
│   ├── index.js
│   └── middlewares
│       ├── authenticate
│       │   └── index.js
│       ├── docs
│       │   ├── index.html
│       │   └── index.js
│       ├── errorHandler.js
│       ├── logIncoming.js
│       └── pingRoute.js
├── auth
│   └── index.js
├── connectors
│   ├── createConnector.js
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
│   ├── queryUtilities
│   │   ├── defaultWhereFactory.js
│   │   └── filterWhereFactory.js
│   ├── relationshipsUtilities
│   │   ├── buildIncludeArray.js
│   │   ├── buildIncludeArray.spec.js
│   │   ├── extractRelationships
│   │   │   ├── addEmptyRelationships.js
│   │   │   ├── addEmptyRelationships.spec.js
│   │   │   ├── buildEmptyRelationship.js
│   │   │   ├── buildEmptyRelationship.spec.js
│   │   │   ├── extractRelationship.js
│   │   │   └── index.js
│   │   ├── shouldIncludeRelation.js
│   │   └── shouldIncludeRelation.spec.js
│   ├── transformations
│   │   ├── createArrayResponse.js
│   │   ├── createObjectResponse.js
│   │   ├── inputObject.js
│   │   ├── outputArray.js
│   │   └── outputObject.js
│   ├── update.js
│   ├── updateRelationHasMany.js
│   └── updateRelationHasOne.js
├── elasticsearch
│   ├── db
│   │   └── index.js
│   ├── index.js
│   └── models
│       ├── createModels.js
│       ├── factories
│       │   └── normalizedElasticModel
│       ├── index.js
│       ├── loadInitialData.js
│       ├── syncModels.js
│       └── utilities
│           └── extractModelFunctionsFromServices.js
├── sequelize
│   ├── db
│   │   └── index.js
│   ├── index.js
│   └── models
│       ├── createModels.js
│       ├── createRelations.js
│       ├── factories
│       │   └── versionedDocumentModel
│       ├── index.js
│       ├── loadInitialData.js
│       ├── syncModels.js
│       └── utilities
│           └── extractModelFunctionsFromServices.js
├── serviceRouter
│   ├── index.js
│   ├── middlewares
│   │   ├── authorize.js
│   │   ├── decorateLocalsUserInput.js
│   │   ├── ensureMediaType
│   │   │   ├── index.js
│   │   │   ├── validateAccept.js
│   │   │   ├── validateAccept.spec.js
│   │   │   ├── validateContentType.js
│   │   │   └── validateContentType.spec.js
│   │   ├── error.js
│   │   └── requestHandler.js
│   └── utilities
│       └── expressifyPath.js
├── services
│   ├── index.js
│   ├── operationFactory
│   │   ├── createOperationSpecification.js
│   │   ├── index.js
│   │   └── typeFactories
│   │       ├── create.js
│   │       ├── getMany.js
│   │       ├── getOne.js
│   │       ├── getRelationHasMany.js
│   │       ├── getRelationHasOne.js
│   │       ├── getVersion.js
│   │       ├── getVersions.js
│   │       ├── index.js
│   │       ├── schemas
│   │       ├── update.js
│   │       ├── updateRelationHasMany.js
│   │       ├── updateRelationHasOne.js
│   │       └── utilities
│   ├── resourceFactory
│   │   ├── createOperationMap.js
│   │   ├── createResourceSpecification.js
│   │   └── index.js
│   ├── schemas
│   │   ├── resourceSpecification.js
│   │   └── serviceSpecification.js
│   ├── serviceFactory
│   │   ├── createServiceSpecification.js
│   │   └── index.js
│   └── utilities
│       ├── testOperationSpecification.js
│       ├── testOperationSpecification.spec.js
│       ├── testResourceSpecification.js
│       ├── testResourceSpecification.spec.js
│       ├── testServiceSpecification.js
│       └── testServiceSpecification.spec.js
└── tree.md

```

## Links
[root](../../tree.md)
[src](../tree.md)
[apps](../apps/tree.md)
[services](../services/tree.md)