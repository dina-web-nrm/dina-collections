# Tree for lib
## Tree
```bash
├── app
│   ├── index.js
│   └── middlewares
│       ├── docs
│       │   ├── index.html
│       │   └── index.js
│       ├── errorHandler.js
│       ├── logIncoming.js
│       ├── pingRoute.js
│       └── responseTime.js
├── auth
│   ├── createUser.js
│   ├── index.js
│   └── middleware.js
├── bootstrap
│   ├── bootstrapApi.js
│   ├── bootstrapBase.js
│   ├── bootstrapData.js
│   ├── bootstrapWorker.js
│   ├── setupConnectors.js
│   ├── setupJobs.js
│   └── setupServiceInteractor.js
├── config
│   ├── createBaseConfig.js
│   ├── createPostgresDbConfig.js
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
│   │   ├── bulkCreate.js
│   │   ├── count.js
│   │   ├── create.js
│   │   ├── del.js
│   │   ├── getMany.js
│   │   ├── getOne.js
│   │   ├── getRelationship.js
│   │   ├── index.js
│   │   ├── query.js
│   │   ├── update.js
│   │   ├── updateRelationship
│   │   │   ├── index.js
│   │   │   ├── updateJsonRelationship
│   │   │   └── updateSqlRelationship
│   │   └── validate.js
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
│   ├── relationshipsUtilities
│   ├── utilities
│   │   ├── applyHooks
│   │   │   └── index.js
│   │   ├── applyInterceptors
│   │   │   └── index.js
│   │   ├── createInterceptors
│   │   │   └── index.js
│   │   ├── createPreHooks
│   │   │   └── index.js
│   │   ├── relationships
│   │   │   ├── buildIncludeArray.js
│   │   │   ├── buildIncludeArray.spec.js
│   │   │   ├── extractRelationships
│   │   │   ├── fetchJsonExternalRelationships
│   │   │   ├── getFormatOutput.js
│   │   │   ├── getJsonRelationship
│   │   │   ├── getSqlRelationship
│   │   │   ├── shouldIncludeRelation.js
│   │   │   └── shouldIncludeRelation.spec.js
│   │   ├── transformations
│   │   │   ├── createArrayResponse.js
│   │   │   ├── createObjectResponse.js
│   │   │   ├── createRelationshipsArrayResponse.js
│   │   │   ├── createRelationshipsObjectResponse.js
│   │   │   ├── inputArray.js
│   │   │   ├── inputObject.js
│   │   │   ├── outputArray.js
│   │   │   └── outputObject.js
│   │   └── wrapper
│   │       └── index.js
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
│   │   │   ├── createTagTypeAggregation.js
│   │   │   ├── createTagValueAggregation.js
│   │   │   ├── createTextPreviewAggregation.js
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
│   │   │   ├── createEqualFilter.js
│   │   │   ├── createFeatureRangeFilter.js
│   │   │   ├── createForeignKeyMatchFilter.js
│   │   │   ├── createManyJsonRelationshipFilter.js
│   │   │   ├── createNumberRangeFilter.js
│   │   │   ├── createStringMatchFilter.js
│   │   │   ├── createStringSearchFilter.js
│   │   │   ├── createTagMatchFilter.js
│   │   │   ├── createTagSearchFilter.js
│   │   │   ├── createTextSearch
│   │   │   └── index.js
│   │   ├── schemas
│   │   │   ├── filter.js
│   │   │   └── filterSpecification.js
│   │   ├── sharedFilters
│   │   │   ├── ancestorsToId.js
│   │   │   ├── deactivated.js
│   │   │   ├── group.js
│   │   │   ├── id.js
│   │   │   ├── ids.js
│   │   │   ├── index.js
│   │   │   ├── name.js
│   │   │   ├── nameSearch.js
│   │   │   ├── nodesWithCircularDependencies.js
│   │   │   ├── parentId.js
│   │   │   ├── raw.js
│   │   │   └── updatedAfter.js
│   │   └── utilities
│   │       ├── createGetManyFilterSpecifications.js
│   │       └── createGetOneFilterSpecifications.js
│   ├── hooks
│   │   └── sharedHooks
│   │       └── ensureNoCircularAncestorsPreHook.js
│   ├── interceptors
│   │   └── sharedInterceptors
│   │       ├── ancestorsToId.js
│   │       └── nodesWithCircularDependencies.js
│   ├── mappings
│   │   ├── factories
│   │   │   ├── createDateMapping.js
│   │   │   ├── createFeatureRangeMapping.js
│   │   │   ├── createIntegerMapping.js
│   │   │   ├── createKeywordAndRawMapping.js
│   │   │   ├── createKeywordMapping.js
│   │   │   ├── createNestedMapping.js
│   │   │   ├── createNumberMapping.js
│   │   │   ├── createValueTagMapping.js
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
│           ├── createGlobals.js
│           ├── createKeyIdMapDecorator.js
│           ├── extractFetchParents.js
│           ├── fetchParents.js
│           ├── fetchParentsSync.js
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
├── fileInteractor
│   ├── createFullPath.js
│   ├── ensurePathIsRelative.js
│   └── index.js
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
│   │   ├── bulkCreate.js
│   │   ├── count.js
│   │   ├── create.js
│   │   ├── del.js
│   │   ├── getMany.js
│   │   ├── getOne.js
│   │   ├── getRelationship.js
│   │   ├── index.js
│   │   ├── query.js
│   │   ├── schemas
│   │   │   ├── base.js
│   │   │   ├── bulkCreate.js
│   │   │   ├── count.js
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
│   │   │   ├── updateRelationship.js
│   │   │   └── validate.js
│   │   ├── update.js
│   │   ├── updateRelationship.js
│   │   ├── utilities
│   │   │   ├── addExampleToQueryParams.js
│   │   │   ├── addFieldsToQueryParams.js
│   │   │   ├── addIncludeDeactivatedQueryParam.js
│   │   │   ├── addLimitToQueryParams.js
│   │   │   ├── addMockToQueryParams.js
│   │   │   ├── addOffsetToQueryParams.js
│   │   │   ├── addQueryParamsFromFilterSpecifications.js
│   │   │   ├── addRelationsToQueryParams.js
│   │   │   ├── addSortingToQueryParams.js
│   │   │   ├── buildQueryRequest
│   │   │   └── buildRelations.js
│   │   └── validate.js
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
│   ├── index.js
│   └── virtualOperations
│       ├── createResourceBatchExecute.js
│       ├── createResourceBatchUpdate.js
│       └── index.js
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
├── statistics
│   └── index.js
└── tree.md

```

## Links
[root](../../tree.md)
[src](../tree.md)
[apps](../apps/tree.md)
[services](../services/tree.md)