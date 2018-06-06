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
├── bootstrap
│   └── index.js
├── connectors
│   ├── createConnector.js
│   ├── extractCustomControllersFromServices.js
│   ├── extractOperationsFromResources.js
│   ├── extractResourcesFromServices.js
│   └── index.js
├── controllers
│   ├── create.js
│   ├── del.js
│   ├── getMany.js
│   ├── getOne.js
│   ├── getRelationship.js
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
│   │   ├── getFormatOutput.js
│   │   ├── getJsonRelationship
│   │   │   ├── getGetterName.js
│   │   │   ├── getQueryModels.js
│   │   │   ├── getSelectedResult.js
│   │   │   ├── getWhereParams.js
│   │   │   └── index.js
│   │   ├── getSqlRelationship
│   │   │   ├── getGetterName.js
│   │   │   ├── getInclude.js
│   │   │   ├── getQueryModels.js
│   │   │   ├── getSelectedResult.js
│   │   │   ├── getWhereParams.js
│   │   │   └── index.js
│   │   ├── shouldIncludeRelation.js
│   │   ├── shouldIncludeRelation.spec.js
│   │   ├── updateJsonRelationship
│   │   │   └── index.js
│   │   └── updateSqlRelationship
│   │       ├── getUpdateValues.js
│   │       └── index.js
│   ├── transformations
│   │   ├── createArrayResponse.js
│   │   ├── createObjectResponse.js
│   │   ├── createRelationshipsArrayResponse.js
│   │   ├── createRelationshipsObjectResponse.js
│   │   ├── inputObject.js
│   │   ├── outputArray.js
│   │   └── outputObject.js
│   ├── update.js
│   └── updateRelationship.js
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
├── integrations
│   ├── factories
│   │   ├── index.js
│   │   └── keycloakAdmin
│   │       ├── index.js
│   │       └── utilities
│   └── index.js
├── searchEngine
│   ├── index.js
│   ├── indexBuilder
│   │   ├── buildIndex
│   │   │   ├── createBatch.js
│   │   │   ├── index.js
│   │   │   └── rebuild.js
│   │   ├── dataInterface
│   │   │   ├── bulkCreate.js
│   │   │   ├── cache
│   │   │   ├── getCount.js
│   │   │   ├── getItemByTypeId.js
│   │   │   ├── getItems.js
│   │   │   ├── index.js
│   │   │   ├── migrateData.js
│   │   │   └── truncate.js
│   │   └── index.js
│   └── todo
├── sequelize
│   ├── db
│   │   └── index.js
│   ├── index.js
│   └── models
│       ├── createModels.js
│       ├── createRelations.js
│       ├── factories
│       │   ├── documentModel
│       │   └── versionedDocumentModel
│       ├── index.js
│       ├── loadInitialData
│       │   ├── index.js
│       │   └── utilities
│       ├── syncModels.js
│       └── utilities
│           ├── extractModelFunctionsFromServices.js
│           ├── getForeignKeyName.js
│           └── setupAssociation.js
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
│   │       ├── del.js
│   │       ├── getMany.js
│   │       ├── getOne.js
│   │       ├── getRelationship.js
│   │       ├── getVersion.js
│   │       ├── getVersions.js
│   │       ├── index.js
│   │       ├── schemas
│   │       ├── update.js
│   │       ├── updateRelationship.js
│   │       └── utilities
│   ├── relations
│   │   └── createSetupRelations.js
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