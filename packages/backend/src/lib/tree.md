```bash
├── app
│   ├── createApp.js
│   ├── index.js
│   ├── middlewares
│   │   ├── docs
│   │   │   ├── index.html
│   │   │   └── index.js
│   │   ├── errorHandler.js
│   │   ├── logFrontendErrorEndpoint.js
│   │   ├── logIncoming.js
│   │   ├── pingRoute.js
│   │   └── responseTime.js
│   └── tree.md
├── auth
│   ├── createAuth.js
│   ├── createUser.js
│   ├── index.js
│   ├── middleware.js
│   └── tree.md
├── bootstrap
│   ├── bootstrapApi.js
│   ├── bootstrapData.js
│   ├── bootstrapServiceInteractor.js
│   ├── bootstrapWorker.js
│   ├── core
│   │   ├── createCore.js
│   │   └── index.js
│   ├── index.js
│   └── tree.md
├── config
│   ├── createConfig.js
│   ├── createPostgresDbConfig.js
│   ├── env
│   │   ├── envDefinitions.js
│   │   └── index.js
│   ├── index.js
│   ├── testConfig.js
│   └── tree.md
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
│   │   │   ├── createResourceActivityFilterByIds.js
│   │   │   ├── createStringInFilter.js
│   │   │   ├── createStringMatchFilter.js
│   │   │   ├── createStringNotInFilter.js
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
│   │   │   ├── excludeRootNode.js
│   │   │   ├── group.js
│   │   │   ├── id.js
│   │   │   ├── ids.js
│   │   │   ├── index.js
│   │   │   ├── isRootNode.js
│   │   │   ├── name.js
│   │   │   ├── nameSearch.js
│   │   │   ├── nodesWithCircularDependencies.js
│   │   │   ├── parentId.js
│   │   │   ├── raw.js
│   │   │   └── updatedAfter.js
│   │   └── utilities
│   │       ├── createGetManyFilterSpecifications.js
│   │       ├── createGetOneFilterSpecifications.js
│   │       └── createRegexpElasticFilters.js
│   ├── hooks
│   │   └── sharedHooks
│   │       └── ensureNoCircularAncestorsPreHook.js
│   ├── interceptors
│   │   └── sharedInterceptors
│   │       ├── ancestorsToId.js
│   │       └── nodesWithCircularDependencies.js
│   ├── mappings
│   │   └── factories
│   │       ├── createDateMapping.js
│   │       ├── createFeatureRangeMapping.js
│   │       ├── createIntegerMapping.js
│   │       ├── createKeywordMapping.js
│   │       ├── createNestedMapping.js
│   │       ├── createNumberMapping.js
│   │       ├── createValueTagMapping.js
│   │       └── index.js
│   ├── sort
│   │   ├── schemas
│   │   │   └── sortableFields.js
│   │   └── utilities
│   │       └── extractSortObjectsFromUserInput.js
│   ├── transformations
│   │   ├── schemas
│   │   │   └── transformationSpecification.js
│   │   ├── sharedTransformations
│   │   │   ├── all.js
│   │   │   ├── allFromAttributes.js
│   │   │   ├── allFromSrcWithIndexId.js
│   │   │   ├── id.js
│   │   │   └── index.js
│   │   └── utilities
│   │       ├── applyTransformations.js
│   │       ├── createGlobals.js
│   │       ├── createKeyIdMapDecorator.js
│   │       ├── extractFetchParents.js
│   │       ├── fetchParents.js
│   │       ├── fetchParentsSync.js
│   │       ├── getItemByTypeId.js
│   │       ├── postTransformationNoop.js
│   │       ├── postTransformationRemoveNull.js
│   │       └── preTransformationCoreToNested.js
│   └── tree.md
├── dataStores
│   ├── elasticsearch
│   │   ├── db
│   │   │   └── index.js
│   │   └── index.js
│   ├── factories.js
│   ├── inMemory
│   │   ├── db
│   │   │   ├── createDb.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── index.js
│   ├── sequelize
│   │   ├── db
│   │   │   └── index.js
│   │   └── index.js
│   ├── tree.md
│   └── utilities
│       └── createDataStores.js
├── errorLogger
│   ├── createErrorLogger.js
│   ├── index.js
│   └── tree.md
├── fileInteractor
│   ├── createFileInteractor.js
│   ├── createFullPath.js
│   ├── ensurePathIsRelative.js
│   ├── index.js
│   └── tree.md
├── importer
│   ├── index.js
│   ├── runImport.js
│   └── tree.md
├── integrations
│   ├── createIntegrations.js
│   ├── factories
│   │   ├── index.js
│   │   └── keycloakAdmin
│   │       ├── index.js
│   │       └── utilities
│   ├── index.js
│   └── tree.md
├── models
│   ├── elasticsearch
│   │   ├── documentModel
│   │   │   ├── index.js
│   │   │   ├── methods
│   │   │   └── setupMethods.js
│   │   └── utilities
│   │       ├── buildElasticAggregations
│   │       ├── buildElasticQuery
│   │       ├── createMappingsFromSpecification.js
│   │       ├── extractItemsFromAggregations
│   │       ├── extractItemsFromResult
│   │       ├── extractMetaFromResult
│   │       └── regexpBuilder
│   ├── factories.js
│   ├── inMemory
│   │   ├── documentModel
│   │   │   ├── index.js
│   │   │   ├── methods
│   │   │   └── setupMethods.js
│   │   └── viewDocumentModel
│   │       ├── index.js
│   │       ├── methods
│   │       └── setupMethods.js
│   ├── index.js
│   ├── sequelize
│   │   ├── documentModel
│   │   │   ├── index.js
│   │   │   └── setupMethods.js
│   │   ├── normalizedDocumentModel
│   │   │   ├── index.js
│   │   │   └── setupMethods.js
│   │   ├── sharedMethods
│   │   │   ├── buildWhereFilterFactory.js
│   │   │   ├── buildWhereQueryFactory.js
│   │   │   ├── bulkCreateFactory.js
│   │   │   ├── createFactory.js
│   │   │   ├── delFactory.js
│   │   │   ├── getByIdFactory.js
│   │   │   ├── getCountFactory.js
│   │   │   ├── getOneWhereFactory.js
│   │   │   ├── getWhereFactory.js
│   │   │   ├── setupRelationsFactory.js
│   │   │   ├── synchronizeFactory.js
│   │   │   ├── updateFactory.js
│   │   │   └── updatePrimaryKeyFactory.js
│   │   ├── simpleSqlModel
│   │   │   ├── index.js
│   │   │   ├── methods
│   │   │   ├── setupMethods.js
│   │   │   └── utilities
│   │   ├── utilities
│   │   │   ├── createGetters.js
│   │   │   ├── createSetters.js
│   │   │   ├── createSetupRelations.js
│   │   │   ├── extractMetaFromResult.js
│   │   │   ├── extractNormalizedColumns.js
│   │   │   ├── formatModelItemResponse.js
│   │   │   ├── formatModelItemsResponse.js
│   │   │   ├── getForeignKeyName.js
│   │   │   ├── mergeNormalizedColumns.js
│   │   │   └── setupAssociation.js
│   │   └── viewDocumentModel
│   │       ├── index.js
│   │       ├── methods
│   │       └── setupMethods.js
│   ├── tests
│   │   ├── createModelTests
│   │   │   └── index.js
│   │   ├── methodTests
│   │   │   ├── bulkCreate.js
│   │   │   ├── create.js
│   │   │   ├── del.js
│   │   │   ├── getById.js
│   │   │   ├── getOneWhere.js
│   │   │   ├── getWhere.js
│   │   │   ├── index.js
│   │   │   └── update.js
│   │   ├── setupTestDatastores
│   │   │   └── index.js
│   │   ├── setupTestModels
│   │   │   └── index.js
│   │   ├── testData
│   │   │   └── index.js
│   │   └── testModels.test.js
│   ├── tree.md
│   └── utilities
│       ├── createModels
│       │   ├── createModels.js
│       │   ├── createRelations.js
│       │   ├── index.js
│       │   └── synchronizeModels.js
│       ├── mergeRelationships.js
│       ├── parseFilterValue.js
│       └── wrappers
│           ├── methods
│           ├── sharedSchemas
│           └── wrapperFactory.js
├── operations
│   ├── crud
│   │   ├── bulkCreate
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
│   │   ├── count
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
│   │   ├── create
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
│   │   ├── del
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
│   │   ├── getMany
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
│   │   ├── getOne
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
│   │   ├── getRelationship
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
│   │   ├── index.js
│   │   ├── query
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
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
│   │   ├── update
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
│   │   ├── updateRelationship
│   │   │   ├── controllerFactory
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
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
│   │   └── validate
│   │       ├── controllerFactory.js
│   │       ├── index.js
│   │       └── specificationFactory.js
│   ├── factories.js
│   ├── import
│   │   ├── importDataFromFile
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
│   │   ├── index.js
│   │   └── schemas
│   │       ├── base.js
│   │       └── index.js
│   ├── index.js
│   ├── job
│   │   ├── index.js
│   │   ├── schemas
│   │   │   ├── base.js
│   │   │   └── index.js
│   │   ├── setJobFailed
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
│   │   ├── setJobSuccess
│   │   │   ├── controllerFactory.js
│   │   │   ├── index.js
│   │   │   └── specificationFactory.js
│   │   └── startJob
│   │       ├── controllerFactory.js
│   │       ├── index.js
│   │       └── specificationFactory.js
│   ├── tree.md
│   ├── utilities
│   │   ├── applyHooks
│   │   │   └── index.js
│   │   ├── applyInterceptors
│   │   │   └── index.js
│   │   ├── createInterceptors
│   │   │   └── index.js
│   │   ├── createOperations
│   │   │   └── index.js
│   │   ├── createPreHooks
│   │   │   └── index.js
│   │   ├── relationships
│   │   │   ├── buildIncludeArray.js
│   │   │   ├── buildIncludeArray.spec.js
│   │   │   ├── extractRelationships
│   │   │   ├── fetchExternalRelationships
│   │   │   ├── getFormatOutput.js
│   │   │   ├── getJsonRelationship
│   │   │   ├── getPolymorphicRelationship
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
│   └── view
│       ├── emptyView
│       │   ├── controllerFactory.js
│       │   ├── index.js
│       │   └── specificationFactory.js
│       ├── getViewMeta
│       │   ├── controllerFactory.js
│       │   ├── index.js
│       │   └── specificationFactory.js
│       ├── index.js
│       ├── rebuildView
│       │   ├── controllerFactory
│       │   ├── index.js
│       │   └── specificationFactory.js
│       ├── schemas
│       │   ├── base.js
│       │   └── index.js
│       ├── updateView
│       │   ├── controllerFactory
│       │   ├── index.js
│       │   └── specificationFactory.js
│       └── utilities
│           └── defaultTransformationFunctions.js
├── serviceConfigurationManager
│   ├── createServiceSpecifications
│   │   ├── createModelSpecification
│   │   │   └── index.js
│   │   ├── createOperationSpecification
│   │   │   ├── createOperationObjectConfiguration.js
│   │   │   └── index.js
│   │   ├── createResourceSpecification
│   │   │   ├── createOperationMap.js
│   │   │   ├── createResourceSpecification.js
│   │   │   └── index.js
│   │   ├── createServiceSpecification
│   │   │   └── index.js
│   │   ├── index.js
│   │   ├── schemas
│   │   │   ├── resourceSpecification.js
│   │   │   └── serviceSpecification.js
│   │   └── utilities
│   │       ├── createOperationMapFromServices.js
│   │       ├── testOperationSpecification.js
│   │       ├── testOperationSpecification.spec.js
│   │       ├── testResourceSpecification.js
│   │       ├── testResourceSpecification.spec.js
│   │       ├── testServiceSpecification.js
│   │       └── testServiceSpecification.spec.js
│   ├── getCustomControllerFactories.js
│   ├── getModelSpecifications.js
│   ├── getOperationSpecifications.js
│   ├── index.js
│   └── tree.md
├── serviceInteractor
│   ├── cache.js
│   ├── callController.js
│   ├── createServiceInteractor.js
│   ├── index.js
│   ├── tree.md
│   └── virtualOperations
│       ├── createResourceBatchExecute.js
│       ├── createResourceBatchUpdate.js
│       └── index.js
├── serviceRouter
│   ├── createRerviceRouter.js
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
│   ├── tree.md
│   └── utilities
│       ├── expressifyPath.js
│       └── shouldMountOperation.js
├── tree.md
└── worker
    ├── createWorker.js
    ├── execute.js
    ├── findNext.js
    ├── index.js
    └── tree.md

```