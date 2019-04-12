---
id: serviceConfigurations
title: Service configurations
sidebar_label: Service configurations
---

> TODO expand

All serviceConfigurations are located under `./src/serviceConfigurations`. The
serviceConfigurations contain the configuration for all the backend
[services](./terminology#service). The serviceConfigurations contain
resourceConfigurations which in turn contains model and operation
configurations. The structure of the files in the serviceConfigurations folder
is similar to the serviceConfiguration object. The main difference is that model
and operationConfigurations live inside index.js of the resourceConfiguration
(see example below).

```bash

# Object structure
serviceConfigurations
├── agentService # serviceConfiguration
│   ├── info
│   └── resources # resourceConfigurations
│       └── normalizedAgent # resourceConfiguration
│           ├── model # modelConfiguration
│           ├── operations # operationConfigurations
│           │   ├── getMany # operationConfiguration
│           │   ├── create
│           │   └── ...
└── ...  

# File structure
serviceConfigurations
├── agentService # serviceConfiguration
│   ├── index.js
│   ├── info
│   │   ├── description.md
│   │   └── index.js
│   ├── resources # resourceConfigurations
│   │   ├── index.js
│   │   └── normalizedAgent # resourceConfiguration
│   │       ├── exampleRequests
│   │       ├── filterSpecifications
│   │       ├── index.js # Contains model and operationConfigurations
│   │       ├── migrations
│   │       ├── postHooks
│   │       ├── preHooks
│   │       └── transformationSpecifications
│   └── serviceInteractions
│       └── index.js

```

As you can see above in the file structure, the resourceConfiguration contains
other folders like filterSpecifications, postHooks and preHooks. These are
imported into the operationConfigurations and are explained in more detail
below.

This is a table with the name of the current services and its resources. The
service name links to the OpenAPI documentation and the resource name links to
the data model.

| service                                     | resource                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| [agent](api/docs#/agentService)             | [normalizedAgent](/ui/dataModelDocs/current/models/normalizedAgent)               |
| [auth](api/docs#/authService)               | -                                                                                 |
| [curatedList](api/docs#/curatedListService) | [causeOfDeathType](/ui/dataModelDocs/current/models/causeOfDeathType)             |
| [curatedList](api/docs#/curatedListService) | [customTaxonNameType](/ui/dataModelDocs/current/models/customTaxonNameType)       |
| [curatedList](api/docs#/curatedListService) | [establishmentMeansType](/ui/dataModelDocs/current/models/establishmentMeansType) |
| [curatedList](api/docs#/curatedListService) | [featureType](/ui/dataModelDocs/current/models/featureType)                       |
| [curatedList](api/docs#/curatedListService) | [identifierType](/ui/dataModelDocs/current/models/identifierType)                 |
| [curatedList](api/docs#/curatedListService) | [preparationType](/ui/dataModelDocs/current/models/preparationType)               |
| [export](api/docs#/exportService)           | [exportJob](/ui/dataModelDocs/current/models/exportJob)                           |
| [history](api/docs#/historyService)         | [resourceActivity](/ui/dataModelDocs/current/models/resourceActivity)             |
| [identifier](api/docs#/identifierService)   | [catalogNumber](/ui/dataModelDocs/current/models/catalogNumber)                   |
| [job](api/docs#/jobService)                 | [job](/ui/dataModelDocs/current/models/job)                                       |
| [migration](api/docs#/migrationService)     | [dataModelMigrationLog](/ui/dataModelDocs/current/models/dataModelMigrationLog)   |
| [place](api/docs#/placeService)             | [place](/ui/dataModelDocs/current/models/place)                                   |
| [search](api/docs#/searchService)           | [searchSpecimen](/ui/dataModelDocs/current/models/searchSpecimen)                 |
| [specimen](api/docs#/searchService)         | [specimen](/ui/dataModelDocs/current/models/specimen)                             |
| [status](api/docs#/statusService)           | -                                                                                 |
| [storage](api/docs#/storageService)         | [physicalObject](/ui/dataModelDocs/current/models/physicalObject)                 |
| [storage](api/docs#/storageService)         | [storageLocation](/ui/dataModelDocs/current/models/storageLocation)               |
| [taxonomy](api/docs#/taxonomyService)       | [taxon](/ui/dataModelDocs/current/models/taxon)                                   |
| [taxonomy](api/docs#/taxonomyService)       | [taxonName](/ui/dataModelDocs/current/models/taxonName)                           |
