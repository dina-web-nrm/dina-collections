# Tree for lib
Generated at commit: 97b80ab8dc7987fd6429105d10728cd735e84c45
## Tree
```bash
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
│       └── syncModels.js
├── serviceRouter
│   ├── index.js
│   ├── middlewares
│   │   ├── authenticate.js
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
│   │       ├── update.js
│   │       ├── updateRelationHasMany.js
│   │       ├── updateRelationHasOne.js
│   │       └── utilities
│   ├── resourceFactory
│   │   ├── createOperationMap.js
│   │   ├── createResourceSpecification.js
│   │   └── index.js
│   └── serviceFactory
│       ├── createServiceSpecification.js
│       └── index.js
└── tree.md

```

## Links
[root](../../tree.md)
[src](../tree.md)
[apps](../apps/tree.md)
[services](../services/tree.md)