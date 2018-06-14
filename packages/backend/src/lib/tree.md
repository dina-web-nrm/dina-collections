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
│   ├── extractResourcesFromService.js
│   └── index.js
├── controllers
│   ├── crud
│   │   ├── create.js
│   │   ├── del.js
│   │   ├── getMany.js
│   │   ├── getOne.js
│   │   ├── getOneSync.js
│   │   ├── getRelationship.js
│   │   ├── getVersion.js
│   │   ├── getVersions.js
│   │   ├── index.js
│   │   ├── update.js
│   │   └── updateRelationship.js
│   ├── index.js
│   ├── jobs
│   │   ├── createJob.js
│   │   ├── index.js
│   │   ├── setJobFailed.js
│   │   ├── setJobSuccess.js
│   │   └── startJob.js
│   ├── relationshipsUtilities
│   ├── utilities
│   │   ├── relationships
│   │   │   ├── buildIncludeArray.js
│   │   │   ├── buildIncludeArray.spec.js
│   │   │   ├── extractRelationships
│   │   │   ├── getFormatOutput.js
│   │   │   ├── getJsonRelationship
│   │   │   ├── getSqlRelationship
│   │   │   ├── shouldIncludeRelation.js
│   │   │   ├── shouldIncludeRelation.spec.js
│   │   │   ├── updateJsonRelationship
│   │   │   └── updateSqlRelationship
│   │   └── transformations
│   │       ├── createArrayResponse.js
│   │       ├── createObjectResponse.js
│   │       ├── createRelationshipsArrayResponse.js
│   │       ├── createRelationshipsObjectResponse.js
│   │       ├── inputObject.js
│   │       ├── outputArray.js
│   │       └── outputObject.js
│   └── views
│       ├── emptyView.js
│       ├── index.js
│       ├── rebuildView
│       │   ├── createBatch.js
│       │   ├── emptyCacheViews.js
│       │   ├── index.js
│       │   ├── rebuild.js
│       │   └── rebuildCacheViews.js
│       ├── requestRebuildView.js
│       ├── requestUpdateView.js
│       ├── updateView
│       │   ├── createItem.js
│       │   ├── getRequiredAction.js
│       │   ├── index.js
│       │   └── update.js
│       └── utilities
│           └── defaultMapFunction.js
├── dataStores
│   ├── inMemory
│   │   ├── db
│   │   │   ├── createDb.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── index.js
│   └── sequelize
│       ├── db
│       │   └── index.js
│       └── index.js
├── integrations
│   ├── factories
│   │   ├── index.js
│   │   └── keycloakAdmin
│   │       ├── index.js
│   │       └── utilities
│   └── index.js
├── jobs
│   ├── scheduler
│   │   └── index.js
│   └── worker
│       ├── execute.js
│       ├── findNext.js
│       └── index.js
├── models
│   ├── createModels.js
│   ├── createRelations.js
│   ├── factories
│   │   ├── inMemory
│   │   │   ├── documentModel
│   │   │   └── viewDocumentModel
│   │   ├── index.js
│   │   └── sequelize
│   │       ├── documentModel
│   │       ├── sharedMethods
│   │       ├── simpleSqlModel
│   │       ├── utilities
│   │       └── viewDocumentModel
│   ├── index.js
│   ├── loadInitialData.js
│   ├── setupModels.js
│   ├── synchronizeModels.js
│   └── utilities
│       ├── extractModelSpecificationsFromServices.js
│       └── parseFilterValue.js
├── operations
│   ├── crudOperations
│   │   ├── create.js
│   │   ├── del.js
│   │   ├── getMany.js
│   │   ├── getOne.js
│   │   ├── getOneSync.js
│   │   ├── getRelationship.js
│   │   ├── getVersion.js
│   │   ├── getVersions.js
│   │   ├── index.js
│   │   ├── schemas
│   │   │   ├── base.js
│   │   │   ├── create.js
│   │   │   ├── del.js
│   │   │   ├── getMany.js
│   │   │   ├── getOne.js
│   │   │   ├── getOneSync.js
│   │   │   ├── getRelationship.js
│   │   │   ├── getVersion.js
│   │   │   ├── getVersions.js
│   │   │   ├── index.js
│   │   │   ├── raw.js
│   │   │   ├── update.js
│   │   │   └── updateRelationship.js
│   │   ├── update.js
│   │   ├── updateRelationship.js
│   │   └── utilities
│   │       ├── addExampleToQueryParams.js
│   │       ├── addLimitToQueryParams.js
│   │       ├── addMockToQueryParams.js
│   │       ├── addOffsetToQueryParams.js
│   │       ├── addQueryParamsFromFilter.js
│   │       ├── addRelationsToQueryParams.js
│   │       └── buildRelations.js
│   ├── filters
│   │   ├── deactivated.js
│   │   ├── group.js
│   │   ├── ids.js
│   │   ├── index.js
│   │   ├── nameSearch.js
│   │   ├── parentId.js
│   │   └── updatedAfter.js
│   ├── index.js
│   ├── jobOperations
│   │   ├── createJob.js
│   │   ├── index.js
│   │   ├── schemas
│   │   │   ├── base.js
│   │   │   └── index.js
│   │   ├── setJobFailed.js
│   │   ├── setJobSuccess.js
│   │   └── startJob.js
│   └── viewOperations
│       ├── emptyView.js
│       ├── index.js
│       ├── rebuildView.js
│       ├── requestRebuildView.js
│       ├── requestUpdateView.js
│       ├── schemas
│       │   ├── base.js
│       │   └── index.js
│       └── updateView.js
├── serviceInteractor
│   ├── callController.js
│   └── index.js
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
│       ├── expressifyPath.js
│       └── shouldMountOperation.js
├── services
│   ├── index.js
│   ├── operationFactory
│   │   ├── createOperationSpecification.js
│   │   ├── filters
│   │   │   ├── createEqualFilter.js
│   │   │   └── createGetManyFilters.js
│   │   └── index.js
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