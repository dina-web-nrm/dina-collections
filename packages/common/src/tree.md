# Tree for src
## Tree
```bash
├── Dependor
│   └── index.js
├── apiClient
│   ├── createApiMethod.js
│   ├── createRequest
│   │   ├── index.js
│   │   ├── mapInput.js
│   │   └── validateInput.js
│   ├── createRequestHandler.js
│   ├── createResponse
│   │   ├── index.js
│   │   ├── mapOutput.js
│   │   └── validateOutput.js
│   ├── error
│   │   └── index.js
│   ├── fetch
│   │   ├── createBody.js
│   │   ├── createFormBody.js
│   │   ├── createJsonBody.js
│   │   ├── createQueryString.js
│   │   ├── createQueryString.test.js
│   │   ├── createUrl.js
│   │   ├── index.js
│   │   ├── interpolateUrl.js
│   │   └── parseResponse.js
│   ├── index.js
│   ├── index.test.js
│   ├── intercept
│   │   └── index.js
│   ├── schemas
│   │   ├── apiConfigSchema.js
│   │   ├── endpointConfigSchema.js
│   │   ├── jsonApi.json
│   │   └── methodConfigSchema.js
│   ├── utilities
│   │   └── extractMethodsFromConfigs.js
│   └── validation
│       ├── validateApiConfig.js
│       ├── validateEndpointConfig.js
│       └── validateMethodConfig.js
├── asyncReduce
│   └── index.js
├── batch
│   ├── execute
│   │   ├── execute.test.js
│   │   └── index.js
│   ├── index.js
│   ├── map
│   │   ├── index.js
│   │   └── index.test.js
│   └── reduce
│       └── index.js
├── buildFileTrees
│   └── index.js
├── buildOperationId
│   ├── buildOperationId.test.js
│   └── index.js
├── chainPromises
│   └── index.js
├── createLid
│   ├── index.js
│   └── index.test.js
├── date
│   ├── formatAsTimestamp.js
│   ├── getCurrentUTCTimestamp.js
│   ├── getTimestampFromYMD.js
│   └── getYYYYMMDDFromTimestamp.js
├── deleteNullProperties
│   ├── index.js
│   └── index.test.js
├── endpointFactory
│   ├── client.js
│   ├── createEndpointFactory.js
│   ├── server.js
│   └── utilities
│       ├── buildOperationIdPathnameMap.js
│       ├── createBodyValidator.js
│       ├── createGetExample.js
│       ├── createMapQueryParams.js
│       ├── createMapQueryParams.test.js
│       ├── createMock.js
│       ├── createQueryParamValidator.js
│       ├── createResponseValidator.js
│       ├── getExamplesFromMethodSpecifiction.js
│       ├── getModelNameFromSchema.js
│       ├── getSchemaFromRequestBody.js
│       └── getSchemaFromResponse.js
├── error
│   ├── constants
│   │   ├── errorCodes.js
│   │   ├── errorCodes.spec.js
│   │   ├── errorStatus.js
│   │   ├── errorStatus.spec.js
│   │   └── jsonSchemaErrorCodes.js
│   ├── constants-not-used.js
│   ├── errorFactories
│   │   ├── backendError.js
│   │   ├── backendError400.js
│   │   ├── backendError403.js
│   │   ├── backendError404.js
│   │   ├── backendError500.js
│   │   ├── createParameterErrorsFromAjv
│   │   │   ├── decorateAdditionalProperties.js
│   │   │   ├── index.js
│   │   │   ├── mapErrors.js
│   │   │   └── transform.js
│   │   ├── frontendError.js
│   │   ├── sanitizeBackendError.js
│   │   └── transformToReduxFormError.js
│   ├── isKnownError.js
│   ├── utilities
│   │   ├── createErrorId.js
│   │   ├── isDinaError.js
│   │   ├── logError.js
│   │   └── transformToReduxFormError.js
│   └── validators
│       ├── createBackendApiClientValidator.js
│       ├── createFrontendApiClientValidator.js
│       ├── createSystemBackendValidator.js
│       ├── createSystemFrontendValidator.js
│       ├── customFormValidator.js
│       ├── dbValidator.js
│       └── formValidator.js
├── formatObject
│   ├── coreToNested.js
│   ├── coreToNested.test.js
│   ├── coreToNestedSync.js
│   ├── coreToNestedSync.test.js
│   ├── index.js
│   ├── nestedToCore.js
│   ├── nestedToCore.test.js
│   ├── nestedToCoreSync.js
│   ├── nestedToCoreSync.test.js
│   ├── normalize
│   │   ├── denormalizeItem.js
│   │   └── normalizeItem.js
│   ├── relationships
│   │   ├── extractItemRelationship.js
│   │   ├── extractItemRelationships.js
│   │   ├── resolveItemRelationship.js
│   │   ├── resolveItemRelationshipSync.js
│   │   ├── resolveItemRelationships.js
│   │   ├── resolveItemRelationshipsSync.js
│   │   └── utilities
│   │       ├── extractArrayRelationship.js
│   │       ├── extractByPath.js
│   │       ├── extractObjectRelationship.js
│   │       ├── getItemByLid.js
│   │       ├── getItemByLid.test.js
│   │       ├── getRelationshipItems.js
│   │       ├── getRelationshipItems.test.js
│   │       ├── getRelationshipItemsSync.js
│   │       ├── getRelationshipItemsSync.test.js
│   │       ├── resolveById.js
│   │       ├── resolveById.test.js
│   │       ├── resolveByPath.js
│   │       ├── resolveByPath.test.js
│   │       ├── resolveRelationshipDataArray.js
│   │       ├── resolveRelationshipDataObject.js
│   │       ├── setExtractedRelationshipData.js
│   │       └── updatePathRelationshipData.js
│   ├── specifications.js
│   ├── todo
│   └── utilities
│       ├── cloneObject.js
│       ├── columnArrayToObject.js
│       ├── columnObjectToArray.js
│       ├── createRelationshipIdMap.js
│       ├── getModelRelationshipPath.js
│       ├── getNextWalkPath.js
│       ├── getNextWalkPath.test.js
│       ├── testData
│       │   ├── apiFormatPhysicalObject.js
│       │   ├── apiFormatSpecimen.js
│       │   ├── denormalizedSpecimen.js
│       │   ├── denormalizedSpecimenWithLids.js
│       │   ├── nestedPhysicalObjectWithRelationships.js
│       │   └── normalizedSpecimenWithNewPhysicalObject.js
│       ├── walkObject.js
│       └── walkObject.test.js
├── jsonApiClient
│   ├── get
│   │   ├── createIncludeJobs.js
│   │   ├── fetchIncluded.js
│   │   ├── getMany.js
│   │   ├── getOne.js
│   │   └── runIncludeJobs.js
│   ├── index.js
│   ├── index.test.js
│   ├── modify
│   │   ├── create
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── createWithRelationships
│   │   │   └── index.js
│   │   ├── modifyRelationshipResources
│   │   │   ├── index.js
│   │   │   ├── index.test.js
│   │   │   ├── modifyRelatedResourceItem.js
│   │   │   ├── modifyRelatedResourceItem.test.js
│   │   │   ├── modifyRelatedResourceItems.js
│   │   │   ├── modifyRelatedResourceItems.test.js
│   │   │   ├── modifyRelationshipResource.js
│   │   │   └── modifyRelationshipResource.test.js
│   │   ├── recursiveCreate.js
│   │   ├── recursiveCreate.test.js
│   │   ├── recursiveUpdate.js
│   │   ├── recursiveUpdate.test.js
│   │   ├── setDependencies.js
│   │   ├── update
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── updateRelationship.js
│   │   ├── updateRelationships.js
│   │   └── updateWithRelationships
│   │       └── index.js
│   └── utilities
│       ├── clone.js
│       ├── createOperationSpecificQueryParams.js
│       ├── createRelationSpecification.js
│       ├── createRelationSpecification.test.js
│       ├── getRelativeRelationships.js
│       ├── getRelativeRelationships.test.js
│       ├── splitRelationships.js
│       └── splitRelationships.test.js
├── jsonSchema
│   ├── createMockDataFromSchema.js
│   ├── createMockGenerator.js
│   ├── createNormalizedValidator.js
│   ├── createValidator.js
│   ├── createValidatorFactory.js
│   ├── importJsonFakerSync.js
│   ├── index.js
│   ├── validateAgainstModel.js
│   └── validateAgainstSchema.js
├── log
│   ├── createLogMock.js
│   ├── index.js
│   ├── logFactory.js
│   ├── priorityMap.js
│   └── testLog.js
├── migrator
│   └── index.js
├── openApiClient
│   ├── index.js
│   └── utilities
│       └── createOpenApiMockClient.js
├── reporter
│   └── index.js
├── schemaBuilder
│   ├── build
│   │   ├── buildEndpoints
│   │   │   ├── buildEndpoint
│   │   │   └── index.js
│   │   ├── models
│   │   │   └── index.js
│   │   ├── openApi
│   │   │   ├── createOpenApiComponents
│   │   │   ├── createOpenApiInfo.js
│   │   │   ├── createOpenApiPaths
│   │   │   ├── createOpenApiSecurity.js
│   │   │   ├── createOpenApiServers.js
│   │   │   ├── createOpenApiTags.js
│   │   │   └── index.js
│   │   └── utilities
│   │       ├── createModel.js
│   │       ├── interpolate.js
│   │       ├── normalizeModel.js
│   │       └── splitDescription.js
│   ├── buildModels.js
│   ├── buildOpenApi.js
│   ├── buildTests
│   │   ├── openApi
│   │   │   └── index.test.js
│   │   ├── schemas
│   │   │   ├── openApi.json
│   │   │   └── swagger.json
│   │   └── testImports.test.js
│   ├── e2e.spec.js
│   ├── read
│   │   ├── index.js
│   │   ├── readApis.js
│   │   ├── readEndpoints.js
│   │   ├── readErrors.js
│   │   ├── readInfo.js
│   │   ├── readModels.js
│   │   ├── readParameters.js
│   │   ├── readSecurity.js
│   │   ├── readServers.js
│   │   └── utilities
│   │       ├── readJsonFromDirectory.js
│   │       ├── readParameterFromJsonFile.js
│   │       └── readParameterFromMarkdownFile.js
│   ├── schemas
│   │   ├── endpoint.json
│   │   ├── openApi.json
│   │   └── swagger.json
│   ├── todo
│   └── write
│       └── index.js
├── schemaInterface
│   ├── createSchemaInterface
│   │   ├── index.js
│   │   └── index.test.js
│   ├── index.js
│   ├── normalize
│   │   ├── createKeyColumnMap.js
│   │   ├── createModelKeyColumnMap.js
│   │   ├── createNormalizeSpecification.js
│   │   ├── createNormalizeSpecifications.js
│   │   ├── index.js
│   │   └── utilities
│   │       ├── getModelColumn.js
│   │       ├── getModelFormat.js
│   │       ├── getModelIsColumn.js
│   │       ├── getModelType.js
│   │       ├── normalizrGetIdAttribute.js
│   │       └── normalizrProcessStrategy.js
│   └── relationships
│       ├── index.js
│       ├── index.test.js
│       ├── modelsSelectors.js
│       ├── modelsSelectors.test.js
│       ├── relationshipsSchemaSelectors.js
│       └── relationshipsSchemaSelectors.test.js
├── scripts
│   └── buildFileStructureTrees.js
├── search
│   ├── filter
│   │   ├── async
│   │   │   └── index.js
│   │   ├── includeItem
│   │   │   └── index.js
│   │   └── sync
│   │       └── index.js
│   ├── map
│   │   └── sync
│   │       └── index.js
│   └── resources
│       ├── shared
│       │   └── filterFunctions
│       └── specimen
│           ├── filterFunctions
│           ├── index.js
│           ├── mapFunctions
│           └── testData
├── sortMethods
│   ├── createSortAlphabeticallyByProperty
│   │   ├── index.js
│   │   └── index.test.js
│   ├── index.js
│   └── index.test.js
├── stringFormatters
│   ├── camelCaseToUpperSnakeCase
│   │   ├── index.js
│   │   └── index.test.js
│   ├── capitalizeFirstLetter
│   │   ├── index.js
│   │   └── index.test.js
│   ├── index.js
│   └── index.test.js
├── testUtilities
│   └── expectNoValidationError.js
└── tree.md

```

## Links
[root](../tree.md)