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
├── config
│   └── env
│       ├── envVariables.js
│       ├── index.js
│       ├── parameterMap.js
│       └── resolveEnvVariables.js
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
│   │   ├── getRelationship.js
│   │   ├── index.js
│   │   ├── query.js
│   │   ├── update.js
│   │   └── updateRelationship.js
│   ├── import
│   │   ├── importDataFromFile
│   │   │   └── index.js
│   │   └── index.js
│   ├── index.js
│   ├── jobs
│   │   ├── createJob.js
│   │   ├── index.js
│   │   ├── setJobFailed.js
│   │   ├── setJobSuccess.js
│   │   └── startJob.js
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
│       │   ├── execute.js
│       │   ├── index.js
│       │   └── rebuildCacheViews.js
│       ├── requestRebuildView.js
│       ├── requestUpdateView.js
│       ├── updateView
│       │   ├── createItem.js
│       │   ├── getRequiredAction.js
│       │   ├── index.js
│       │   └── update.js
│       └── utilities
│           └── defaultTransformationFunctions.js
├── data
│   ├── aggregations
│   │   ├── factories
│   │   │   ├── createStringAggregation.js
│   │   │   └── index.js
│   │   └── schemas
│   │       ├── aggregation.js
│   │       └── aggregationSpecification.js
│   ├── fields
│   │   ├── schemas
│   │   │   └── selectableFields.js
│   │   └── utilities
│   │       ├── extractAggregations.js
│   │       ├── extractFieldsFromItem.js
│   │       ├── extractFieldsFromUserInput.js
│   │       ├── extractFilters.js
│   │       ├── extractMappings.js
│   │       ├── extractSelectableFields.js
│   │       ├── extractSortableFields.js
│   │       └── extractTransformationFunctions.js
│   ├── filters
│   │   ├── factories
│   │   │   ├── createNumberRangeFilter.js
│   │   │   ├── createStringMatchFilter.js
│   │   │   ├── createStringSearchFilter.js
│   │   │   └── index.js
│   │   ├── schemas
│   │   │   ├── filter.js
│   │   │   └── filterSpecification.js
│   │   ├── sharedFilters
│   │   │   ├── deactivated.js
│   │   │   ├── group.js
│   │   │   ├── id.js
│   │   │   ├── ids.js
│   │   │   ├── index.js
│   │   │   ├── name.js
│   │   │   ├── nameSearch.js
│   │   │   ├── parentId.js
│   │   │   ├── raw.js
│   │   │   └── updatedAfter.js
│   │   └── utilities
│   │       ├── createEqualFilterSpecification.js
│   │       └── createGetManyFilterSpecifications.js
│   ├── mappings
│   │   ├── factories
│   │   │   ├── createDateMapping.js
│   │   │   ├── createKeywordAndRawMapping.js
│   │   │   ├── createKeywordMapping.js
│   │   │   ├── createNestedMapping.js
│   │   │   ├── createNumberMapping.js
│   │   │   └── index.js
│   │   └── utilities
│   │       └── extractMappingsFromFieldSpecification.js
│   ├── sort
│   │   ├── schemas
│   │   │   └── sortableFields.js
│   │   └── utilities
│   │       └── extractSortObjectsFromUserInput.js
│   └── transformations
│       ├── schemas
│       │   └── transformationSpecification.js
│       ├── sharedTransformations
│       │   ├── all.js
│       │   ├── allFromAttributes.js
│       │   ├── allFromSrcWithIndexId.js
│       │   ├── id.js
│       │   └── index.js
│       └── utilities
│           ├── applyTransformations.js
│           ├── fetchParents.js
│           ├── getItemByTypeId.js
│           ├── postTransformationNoop.js
│           ├── postTransformationRemoveNull.js
│           └── preTransformationCoreToNested.js
├── dataStores
│   ├── elasticsearch
│   │   ├── db
│   │   │   └── index.js
│   │   └── index.js
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
├── importer
│   └── index.js
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
│   │   ├── elasticsearch
│   │   │   ├── documentModel
│   │   │   └── utilities
│   │   ├── inMemory
│   │   │   ├── documentModel
│   │   │   └── viewDocumentModel
│   │   ├── index.js
│   │   ├── sequelize
│   │   │   ├── documentModel
│   │   │   ├── normalizedDocumentModel
│   │   │   ├── sharedMethods
│   │   │   ├── simpleSqlModel
│   │   │   ├── utilities
│   │   │   └── viewDocumentModel
│   │   ├── tests
│   │   │   ├── createModelTests
│   │   │   ├── methodTests
│   │   │   ├── setupTestDatastores
│   │   │   ├── setupTestModels
│   │   │   ├── testData
│   │   │   └── testModels.test.js
│   │   ├── utilities
│   │   │   └── mergeRelationships.js
│   │   └── wrappers
│   │       ├── methods
│   │       ├── sharedSchemas
│   │       └── wrapperFactory.js
│   ├── index.js
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
│   │   ├── getRelationship.js
│   │   ├── index.js
│   │   ├── query.js
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
│   │   │   ├── query.js
│   │   │   ├── raw.js
│   │   │   ├── update.js
│   │   │   └── updateRelationship.js
│   │   ├── update.js
│   │   ├── updateRelationship.js
│   │   └── utilities
│   │       ├── addExampleToQueryParams.js
│   │       ├── addFieldsToQueryParams.js
│   │       ├── addLimitToQueryParams.js
│   │       ├── addMockToQueryParams.js
│   │       ├── addOffsetToQueryParams.js
│   │       ├── addQueryParamsFromFilterSpecifications.js
│   │       ├── addRelationsToQueryParams.js
│   │       ├── addSortingToQueryParams.js
│   │       └── buildRelations.js
│   ├── importOperations
│   │   ├── importDataFromFile.js
│   │   ├── index.js
│   │   └── schemas
│   │       ├── base.js
│   │       └── index.js
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
│   ├── cache.js
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