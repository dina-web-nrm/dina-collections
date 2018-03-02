```bash
├── apis
│   └── core
│       ├── config.js
│       └── index.js
├── lib
│   ├── api
│   │   ├── index.js
│   │   ├── middlewares
│   │   └── utilities
│   ├── app
│   │   ├── index.js
│   │   └── middlewares
│   ├── connectors
│   │   ├── extractCustomControllersFromServices.js
│   │   ├── extractOperationsFromResources.js
│   │   ├── extractResourcesFromServices.js
│   │   └── index.js
│   ├── controllers
│   │   ├── create.js
│   │   ├── getMany.js
│   │   ├── getOne.js
│   │   ├── getRelationHasMany.js
│   │   ├── getRelationHasOne.js
│   │   ├── getVersion.js
│   │   ├── getVersions.js
│   │   ├── index.js
│   │   ├── relationshipsUtilities
│   │   ├── transformations
│   │   ├── update.js
│   │   ├── updateRelationHasMany.js
│   │   └── updateRelationHasOne.js
│   ├── postgres
│   │   ├── db
│   │   ├── index.js
│   │   └── models
│   └── services
│       ├── index.js
│       ├── operationObjectFactory
│       ├── resourceFactory
│       └── serviceFactory
├── services
│   ├── agentService
│   │   ├── index.js
│   │   ├── info
│   │   ├── models
│   │   └── resources
│   ├── authService
│   │   ├── index.js
│   │   ├── info
│   │   └── resources
│   ├── curatedEventService
│   │   ├── index.js
│   │   ├── info
│   │   ├── models
│   │   └── resources
│   ├── curatedListService
│   │   ├── index.js
│   │   ├── info
│   │   ├── models
│   │   └── resources
│   ├── externalEventService
│   │   ├── index.js
│   │   ├── info
│   │   └── resources
│   ├── identifierService
│   │   ├── index.js
│   │   ├── info
│   │   ├── models
│   │   └── resources
│   ├── index.js
│   ├── localityService
│   │   ├── e2e.spec.js
│   │   ├── index.js
│   │   ├── info
│   │   ├── models
│   │   └── resources
│   ├── organizationService
│   │   ├── index.js
│   │   ├── info
│   │   └── resources
│   ├── specimenService
│   │   ├── controllers
│   │   ├── index.js
│   │   ├── info
│   │   ├── models
│   │   ├── resources
│   │   └── testData
│   ├── statusService
│   │   ├── controllers
│   │   ├── index.js
│   │   ├── info
│   │   └── resources
│   ├── storageService
│   │   ├── e2e.spec.js
│   │   ├── index.js
│   │   ├── info
│   │   ├── models
│   │   └── resources
│   └── taxonService
│       ├── index.js
│       ├── info
│       └── resources
├── tests
│   └── testOperations
│       ├── createOperationTypeResourceOperationIdMap.js
│       └── testOperations.spec.js
└── utilities
    ├── log
    │   └── index.js
    └── test
        ├── apiDescribe.js
        ├── batchDescribe.js
        ├── batchExecute.js
        ├── dbDescribe.js
        ├── testApiClient.js
        └── waitForApiRestart.js
```
