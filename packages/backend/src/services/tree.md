# Tree for services
## Tree
```bash
├── agentService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── models
│   │   └── index.js
│   └── resources
│       ├── agent
│       │   ├── index.js
│       │   └── operations
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
│       └── user
│           └── index.js
├── curatedEventService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── models
│   │   └── index.js
│   └── resources
│       ├── expedition
│       │   ├── index.js
│       │   └── operations
│       └── index.js
├── curatedListService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── models
│   │   ├── index.js
│   │   └── loadInitialData
│   │       └── index.js
│   └── resources
│       ├── causeOfDeathType
│       │   ├── index.js
│       │   └── operations
│       ├── establishmentMeansType
│       │   ├── index.js
│       │   └── operations
│       ├── featureType
│       │   ├── index.js
│       │   └── operations
│       ├── identifierType
│       │   ├── index.js
│       │   └── operations
│       ├── index.js
│       ├── preparationType
│       │   ├── index.js
│       │   └── operations
│       └── typeSpecimenType
│           ├── index.js
│           └── operations
├── externalEventService
│   ├── index.js
│   └── info
│       ├── description.md
│       └── index.js
├── index.js
├── organizationService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   └── resources
│       └── index.js
├── placeService
│   ├── e2e.spec.js
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── models
│   │   ├── index.js
│   │   ├── loadInitialData
│   │   │   └── index.js
│   │   └── relations.js
│   ├── resources
│   │   ├── index.js
│   │   └── place
│   │       ├── create
│   │       ├── getMany
│   │       └── index.js
│   └── todo
├── specimenService
│   ├── controllers
│   │   └── index.js
│   ├── elasticModels
│   │   ├── index.js
│   │   └── loadInitialData
│   │       └── index.js
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── models
│   │   ├── index.js
│   │   ├── loadInitialData
│   │   │   ├── index.js
│   │   │   └── migrations
│   │   └── relations.js
│   ├── resources
│   │   ├── index.js
│   │   └── specimen
│   │       ├── index.js
│   │       ├── operations
│   │       └── testData
│   └── todo.md
├── statusService
│   ├── controllers
│   │   ├── getStatus.js
│   │   └── index.js
│   ├── index.js
│   ├── info
│   │   └── index.js
│   └── resources
│       └── index.js
├── storageService
│   ├── e2e.spec.js
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── models
│   │   ├── index.js
│   │   ├── loadInitialData
│   │   │   └── index.js
│   │   └── relations.js
│   └── resources
│       ├── index.js
│       ├── physicalObject
│       │   ├── index.js
│       │   └── operations
│       └── storageLocation
│           ├── index.js
│           └── operations
├── taxonomyService
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── models
│   │   ├── index.js
│   │   ├── loadInitialData
│   │   │   └── index.js
│   │   └── relations.js
│   └── resources
│       ├── index.js
│       ├── taxon
│       │   ├── index.js
│       │   └── operations
│       └── taxonName
│           ├── index.js
│           └── operations
└── tree.md

```

## Links
[root](../../tree.md)
[src](../tree.md)
[lib](../lib/tree.md)
[apps](../apps/tree.md)