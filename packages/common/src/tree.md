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
├── buildFileTrees
│   └── index.js
├── buildOperationId
│   ├── buildOperationId.test.js
│   └── index.js
├── chainPromises
│   └── index.js
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
│   ├── db
│   │   └── createDbSpecifications.js
│   ├── nestedToCore.js
│   ├── nestedToCore.test.js
│   ├── normalize
│   │   ├── createNormalizeSpecification.js
│   │   ├── createNormalizeSpecifications.js
│   │   ├── denormalizeItem.js
│   │   └── normalizeItem.js
│   ├── relationships
│   │   ├── createRelationshipSpecification.js
│   │   ├── createRelationshipSpecifications.js
│   │   ├── extractItemRelationship.js
│   │   ├── extractItemRelationships.js
│   │   ├── resolveItemRelationship.js
│   │   └── resolveItemRelationships.js
│   ├── specifications.js
│   ├── todo
│   └── utilities
│       ├── cloneObject.js
│       ├── columnArrayToObject.js
│       ├── columnObjectToArray.js
│       ├── createKeyColumnMap.js
│       ├── createLid.js
│       ├── createRelationshipIdMap.js
│       ├── getModelColumn.js
│       ├── getModelFormat.js
│       ├── getModelIsColumn.js
│       ├── getModelRelationshipPath.js
│       ├── getModelType.js
│       ├── normalizrGetIdAttribute.js
│       ├── normalizrProcessStrategy.js
│       ├── testData
│       │   ├── denormalizedSpecimen.js
│       │   ├── denormalizedSpecimenWithLids.js
│       │   ├── normalizedSpecimen.js
│       │   └── normalizedSpecimenWithRelationships.js
│       └── walkObject.js
├── jsonApiClient
│   ├── get
│   │   ├── createIncludeJobs.js
│   │   ├── fetchIncluded.js
│   │   ├── getMany.js
│   │   ├── getOne.js
│   │   └── runIncludeJobs.js
│   ├── index.js
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
│       ├── createOperationId.js
│       ├── createOperationSpecificQueryParams.js
│       ├── createRelationSpecification.js
│       ├── getRelativeRelationships.js
│       └── splitRelationships.js
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
│   └── priorityMap.js
├── openApiClient
│   ├── index.js
│   └── utilities
│       └── createOpenApiMockClient.js
├── schemaBuilder
│   ├── build
│   │   ├── buildEndpoints
│   │   │   ├── buildEndpoint
│   │   │   └── index.js
│   │   ├── index.js
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
│   ├── buildTests
│   │   ├── openApi
│   │   │   └── index.test.js
│   │   ├── schemas
│   │   │   ├── openApi.json
│   │   │   └── swagger.json
│   │   └── testImports.test.js
│   ├── e2e.spec.js
│   ├── index.js
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
├── scripts
│   └── buildFileStructureTrees.js
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