# Tree for src
Generated at commit: 0cdba0c5f4ea06a7ced2ac77a0218afed1b8acb9
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
├── endpointFactory
│   ├── client.js
│   ├── createBodyValidator.js
│   ├── createEndpointFactory.js
│   ├── createMockFunction.js
│   ├── getModelNameFromParameter.js
│   └── server.js
├── error
│   ├── constants.js
│   ├── errorFactories
│   │   ├── base.js
│   │   ├── form.js
│   │   ├── server.js
│   │   └── system.js
│   ├── errorMappers
│   │   ├── ajv
│   │   │   ├── decorateAdditionalProperties.js
│   │   │   ├── index.js
│   │   │   ├── mapErrors.js
│   │   │   └── transform.js
│   │   └── api
│   │       └── index.js
│   ├── index.js
│   ├── isKnownError.js
│   └── validators
│       ├── formModelSchema.js
│       ├── formSchema.js
│       ├── systemModelSchema.js
│       └── systemSchema.js
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
├── schemaBuilder
│   ├── build
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
│   │   ├── swagger
│   │   │   ├── createSwaggerDefinitions
│   │   │   ├── createSwaggerInfo.js
│   │   │   ├── createSwaggerPaths
│   │   │   ├── createSwaggerSecurity.js
│   │   │   ├── createSwaggerServers.js
│   │   │   ├── createSwaggerTags.js
│   │   │   └── index.js
│   │   └── utilities
│   │       ├── createModel.js
│   │       ├── interpolate.js
│   │       └── normalizeModel.js
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
│   │   ├── readEndpoints
│   │   │   ├── index.js
│   │   │   ├── readBody.js
│   │   │   ├── readEndpoint.js
│   │   │   ├── readResponse.js
│   │   │   └── walkEndpoints.js
│   │   ├── readErrors.js
│   │   ├── readInfo.js
│   │   ├── readModels.js
│   │   ├── readParameters.js
│   │   ├── readSecurity.js
│   │   ├── readServers.js
│   │   └── utilities
│   │       ├── buildEndpoint
│   │       ├── readJsonFromDirectory.js
│   │       ├── readParameterFromJsonFile.js
│   │       └── readParameterFromMarkdownFile.js
│   ├── schemas
│   │   ├── endpoint.json
│   │   ├── openApi.json
│   │   └── swagger.json
│   └── write
│       └── index.js
├── scripts
│   └── buildFileStructureTrees.js
└── tree.md

```

## Links
[root](../tree.md)