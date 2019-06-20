```bash
├── agentService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── resources
│   │   ├── index.js
│   │   ├── normalizedAgent
│   │   │   ├── exampleRequests
│   │   │   ├── filterSpecifications
│   │   │   ├── index.js
│   │   │   ├── migrations
│   │   │   ├── postHooks
│   │   │   ├── preHooks
│   │   │   └── transformationSpecifications
│   │   └── searchNormalizedAgent
│   │       ├── aggregationSpecification
│   │       ├── fieldsSpecification
│   │       ├── filterSpecifications
│   │       ├── index.js
│   │       ├── mappingSpecification
│   │       ├── postHooks
│   │       └── transformationSpecifications
│   └── serviceInteractions
│       └── index.js
├── authService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   └── resources
│       ├── accessToken
│       │   └── index.js
│       ├── index.js
│       ├── user
│       │   ├── index.js
│       │   └── operations
│       └── userInfo
│           └── index.js
├── curatedListService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   └── resources
│       ├── causeOfDeathType
│       │   ├── exampleRequests
│       │   ├── index.js
│       │   ├── migrations
│       │   ├── postHooks
│       │   └── transformationSpecifications
│       ├── customTaxonNameType
│       │   ├── exampleRequests
│       │   ├── index.js
│       │   ├── migrations
│       │   ├── postHooks
│       │   └── transformationSpecifications
│       ├── establishmentMeansType
│       │   ├── exampleRequests
│       │   ├── index.js
│       │   ├── migrations
│       │   ├── postHooks
│       │   └── transformationSpecifications
│       ├── featureType
│       │   ├── exampleRequests
│       │   ├── index.js
│       │   ├── migrations
│       │   ├── postHooks
│       │   └── transformationSpecifications
│       ├── identifierType
│       │   ├── exampleRequests
│       │   ├── filterSpecifications
│       │   ├── index.js
│       │   ├── migrations
│       │   ├── postHooks
│       │   └── transformationSpecifications
│       ├── index.js
│       ├── preparationType
│       │   ├── exampleRequests
│       │   ├── index.js
│       │   ├── migrations
│       │   ├── postHooks
│       │   └── transformationSpecifications
│       └── typeSpecimenType
│           ├── exampleRequests
│           ├── index.js
│           ├── migrations
│           ├── postHooks
│           └── transformationSpecifications
├── exportService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   └── resources
│       ├── exportJob
│       │   ├── controllers
│       │   ├── filterSpecifications
│       │   ├── index.js
│       │   ├── migrations
│       │   ├── operationFactories
│       │   ├── postHooks
│       │   └── preHooks
│       └── index.js
├── historyService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── resources
│   │   ├── index.js
│   │   └── resourceActivity
│   │       ├── filterSpecifications
│   │       ├── index.js
│   │       └── migrations
│   └── serviceInteractions
│       └── index.js
├── identifierService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   └── resources
│       ├── catalogNumber
│       │   ├── constants
│       │   ├── controllers
│       │   ├── fieldsSpecification
│       │   ├── filterSpecifications
│       │   ├── index.js
│       │   ├── migrations
│       │   ├── operationFactories
│       │   ├── preHooks
│       │   ├── transformationSpecifications
│       │   └── utilities
│       └── index.js
├── index.js
├── jobService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   └── resources
│       ├── index.js
│       └── job
│           ├── filterSpecifications
│           ├── index.js
│           └── migrations
├── migrationService
│   ├── index.js
│   ├── info
│   │   └── index.js
│   ├── preHooks
│   │   └── index.js
│   ├── resources
│   │   ├── dataModelMigrationLog
│   │   │   ├── index.js
│   │   │   └── migrations
│   │   └── index.js
│   └── serviceInteractions
│       └── index.js
├── placeService
│   ├── e2e.spec.js
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── resources
│   │   ├── index.js
│   │   ├── place
│   │   │   ├── exampleRequests
│   │   │   ├── filterSpecifications
│   │   │   ├── index.js
│   │   │   ├── migrations
│   │   │   ├── postHooks
│   │   │   ├── preHooks
│   │   │   └── transformationSpecifications
│   │   └── searchPlace
│   │       ├── aggregationSpecification
│   │       ├── fieldsSpecification
│   │       ├── filterSpecifications
│   │       ├── index.js
│   │       ├── mappingSpecification
│   │       ├── postHooks
│   │       └── transformationSpecifications
│   └── serviceInteractions
│       └── index.js
├── specimenService
│   ├── cacheResourcesSpecifications.js
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── integrationTests
│   │   ├── __snapshots__
│   │   │   └── sampleData.test.js.snap
│   │   ├── sampleData.test.js
│   │   └── searchSpecimen
│   │       ├── query
│   │       └── testDocumentation
│   ├── resources
│   │   ├── cacheResources.js
│   │   ├── index.js
│   │   ├── searchSpecimen
│   │   │   ├── aggregationSpecification
│   │   │   ├── fieldsSpecification
│   │   │   ├── filterSpecifications
│   │   │   ├── index.js
│   │   │   ├── mappingSpecification
│   │   │   ├── postHooks
│   │   │   └── transformationSpecifications
│   │   └── specimen
│   │       ├── controllers
│   │       ├── e2e
│   │       ├── exampleRequests
│   │       ├── filterSpecifications
│   │       ├── index.js
│   │       ├── migrations
│   │       ├── postHooks
│   │       ├── preHooks
│   │       ├── testData
│   │       ├── transformationSpecifications
│   │       └── utilities
│   └── serviceInteractions
│       └── index.js
├── statusService
│   ├── controllers
│   │   ├── getStatus.js
│   │   └── index.js
│   ├── index.js
│   ├── info
│   │   └── index.js
│   └── resources
│       ├── index.js
│       └── status
│           └── index.js
├── storageService
│   ├── e2e.spec.js
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── resources
│   │   ├── index.js
│   │   ├── physicalObject
│   │   │   ├── exampleRequests
│   │   │   ├── filterSpecifications
│   │   │   ├── index.js
│   │   │   ├── migrations
│   │   │   └── postHooks
│   │   ├── searchStorageLocation
│   │   │   ├── aggregationSpecification
│   │   │   ├── fieldsSpecification
│   │   │   ├── filterSpecifications
│   │   │   ├── index.js
│   │   │   ├── mappingSpecification
│   │   │   ├── postHooks
│   │   │   └── transformationSpecifications
│   │   └── storageLocation
│   │       ├── exampleRequests
│   │       ├── filterSpecifications
│   │       ├── index.js
│   │       ├── migrations
│   │       ├── postHooks
│   │       ├── preHooks
│   │       └── transformationSpecifications
│   └── serviceInteractions
│       └── index.js
├── taxonomyService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── resources
│   │   ├── index.js
│   │   ├── searchTaxon
│   │   │   ├── aggregationSpecification
│   │   │   ├── fieldsSpecification
│   │   │   ├── filterSpecifications
│   │   │   ├── index.js
│   │   │   ├── mappingSpecification
│   │   │   ├── postHooks
│   │   │   └── transformationSpecifications
│   │   ├── searchTaxonName
│   │   │   ├── aggregationSpecification
│   │   │   ├── fieldsSpecification
│   │   │   ├── filterSpecifications
│   │   │   ├── index.js
│   │   │   ├── mappingSpecification
│   │   │   ├── postHooks
│   │   │   └── transformationSpecifications
│   │   ├── taxon
│   │   │   ├── exampleRequests
│   │   │   ├── filterSpecifications
│   │   │   ├── index.js
│   │   │   ├── migrations
│   │   │   ├── postHooks
│   │   │   ├── preHooks
│   │   │   └── transformationSpecifications
│   │   └── taxonName
│   │       ├── filterSpecifications
│   │       ├── index.js
│   │       ├── migrations
│   │       ├── operations
│   │       ├── postHooks
│   │       ├── preHooks
│   │       └── transformationSpecifications
│   └── serviceInteractions
│       └── index.js
├── tests
│   └── serviceConfigurations.test.js
└── tree.md

```