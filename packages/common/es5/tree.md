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
├── jsonApiClient
│   └── index.js
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
├── normalize
│   ├── buildNormalizeSchema
│   │   ├── getIdAttribute.js
│   │   ├── getTypeAndRef.js
│   │   ├── index.js
│   │   └── processStrategy.js
│   ├── denormalizeSpecimen
│   │   ├── columnArrayToObject.js
│   │   ├── denormalizeSpecimen.spec.js
│   │   └── index.js
│   ├── normalizeSpecimen
│   │   ├── columnObjectToArray.js
│   │   ├── index.js
│   │   └── normalizeSpecimen.spec.js
│   ├── normalizedSchemaSpecification.js
│   ├── testData
│   │   ├── denormalizedSpecimen.js
│   │   ├── denormalizedSpecimenWithLids.js
│   │   └── normalizedSpecimen.js
│   └── verifySpecimenNormalization
│       ├── index.js
│       └── verifySpecimenNormalization.spec.js
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