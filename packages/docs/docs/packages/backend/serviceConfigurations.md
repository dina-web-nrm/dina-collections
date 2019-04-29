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

## Schemas

The service, resource, operation and model configurations are validated against
the following schemas, which also contain descriptions about their properties.

### Service configuration schema

<!--- import-file-src: ./packages/backend/src/lib/serviceConfigurationManager/schemas/serviceConfiguration.js -->
<!--- processor: wrap-in-js-code-block -->
<!---
This content is imported from ./packages/backend/src/lib/serviceConfigurationManager/schemas/serviceConfiguration.js using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```js
module.exports = {
  additionalProperties: false,
  properties: {
    basePath: {
      descrition:
        'The base path for the service. Resources will be mounted under this path',
      type: 'string',
    },
    controllers: {
      description: 'Custom controllers used by operations in the service',
      type: 'object',
    },
    info: {
      description: 'Object containing service information',
      properties: {
        description: {
          type: 'string',
        },
      },
      required: [],
      type: 'object',
    },
    name: {
      description: 'Name of the service',
      type: 'string',
    },
    resources: {
      description:
        'An object with the service resources (see resourceConfiguration schema)',
      type: 'object',
    },
  },
  required: ['basePath', 'name', 'info', 'resources'],
}
```

<!--- import-file-end -->

### Resource configuration schema

<!--- import-file-src: ./packages/backend/src/lib/serviceConfigurationManager/schemas/resourceConfiguration.js -->
<!--- processor: wrap-in-js-code-block -->
<!---
This content is imported from ./packages/backend/src/lib/serviceConfigurationManager/schemas/resourceConfiguration.js using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```js
module.exports = {
  additionalProperties: false,
  properties: {
    basePath: {
      description: 'Optional override for serviceConfiguration basePath',
      type: 'string',
    },
    model: {
      description: 'Model configuration (see modelConfiguration schema)',
      type: 'object',
    },
    operations: {
      description:
        'OperationConfigurations (see operationConfiguration schema)',
      type: 'array',
    },
    resource: {
      description: 'Name of the resource',
      type: 'string',
    },
    resourcePath: {
      description:
        'Custom path to the resource. Will otherwise be created based on resource',
      type: 'string',
    },
  },
  required: ['operations'],
}
```

<!--- import-file-end -->

### Operation configuration base schema

This is the base schema for the operations. Most operations extend this schema.
See `./src/lib/operations` to inspect the schemas of specific operations.

<!--- import-file-src: ./packages/backend/src/lib/operations/schemas/operationConfigurations/baseSchema.js -->
<!--- processor: wrap-in-js-code-block -->
<!---
This content is imported from ./packages/backend/src/lib/operations/schemas/operationConfigurations/baseSchema.js using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```js
module.exports = {
  additionalProperties: false,
  properties: {
    connect: {
      type: 'boolean',
    },
    controllerFactory: {
      not: {
        type: 'string',
      },
    },
    errors: {
      type: 'object',
    },
    exampleResponses: {
      type: 'object',
    },
    operationId: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
  },
  required: ['type'],
}
```

<!--- import-file-end -->

### Model configuration schema

<!--- import-file-src: ./packages/backend/src/lib/models/schemas/modelConfiguration.js -->
<!--- processor: wrap-in-js-code-block -->
<!---
This content is imported from ./packages/backend/src/lib/models/schemas/modelConfiguration.js using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```js
module.exports = {
  additionalProperties: false,
  properties: {
    columns: {
      description:
        'Column definition used for the model type: sequelizeSimpleSqlModel',
      type: 'object',
    },
    indexes: {
      description: 'Index definitions for models with postgres as datastore',
      type: 'array',
    },
    mappingSpecification: {
      description:
        'Elasticsearch mappings used for models with elasticsearch as datastore',
      type: 'object',
    },
    migrations: {
      description: 'Migrations for postgres models',
      type: 'object',
    },
    name: {
      description: 'Name of the model used in the datastore',
      type: 'string',
    },
    rebuildStrategy: {
      description: 'Optional for models with elasticsearch as datastore. ',
      enum: ['swap', 'replace'],
      type: 'string',
    },
    relations: {
      type: 'array',
    },
    type: {
      description: 'Model type',
      enum: [
        'sequelizeSimpleSqlModel',
        'sequelizeDocumentModel',
        'elasticsearchDocumentModel',
        'inMemoryDocumentModel',
        'inMemoryViewDocumentModel',
      ],
      type: 'string',
    },
  },
  required: [],
}
```

<!--- import-file-end -->

This is a table with the name of the current services and its resources. The
service name links to the OpenAPI documentation and the resource name links to
the data model.

| service                                     | resource                                                                         |
| ------------------------------------------- | -------------------------------------------------------------------------------- |
| [agent](api/docs#/agentService)             | [normalizedAgent](ui/dataModelDocs/current/models/normalizedAgent)               |
| [auth](api/docs#/authService)               | -                                                                                |
| [curatedList](api/docs#/curatedListService) | [causeOfDeathType](ui/dataModelDocs/current/models/causeOfDeathType)             |
| [curatedList](api/docs#/curatedListService) | [customTaxonNameType](ui/dataModelDocs/current/models/customTaxonNameType)       |
| [curatedList](api/docs#/curatedListService) | [establishmentMeansType](ui/dataModelDocs/current/models/establishmentMeansType) |
| [curatedList](api/docs#/curatedListService) | [featureType](ui/dataModelDocs/current/models/featureType)                       |
| [curatedList](api/docs#/curatedListService) | [identifierType](ui/dataModelDocs/current/models/identifierType)                 |
| [curatedList](api/docs#/curatedListService) | [preparationType](ui/dataModelDocs/current/models/preparationType)               |
| [export](api/docs#/exportService)           | [exportJob](ui/dataModelDocs/current/models/exportJob)                           |
| [history](api/docs#/historyService)         | [resourceActivity](ui/dataModelDocs/current/models/resourceActivity)             |
| [identifier](api/docs#/identifierService)   | [catalogNumber](ui/dataModelDocs/current/models/catalogNumber)                   |
| [job](api/docs#/jobService)                 | [job](ui/dataModelDocs/current/models/job)                                       |
| [migration](api/docs#/migrationService)     | [dataModelMigrationLog](ui/dataModelDocs/current/models/dataModelMigrationLog)   |
| [place](api/docs#/placeService)             | [place](ui/dataModelDocs/current/models/place)                                   |
| [search](api/docs#/searchService)           | [searchSpecimen](ui/dataModelDocs/current/models/searchSpecimen)                 |
| [specimen](api/docs#/searchService)         | [specimen](ui/dataModelDocs/current/models/specimen)                             |
| [status](api/docs#/statusService)           | -                                                                                |
| [storage](api/docs#/storageService)         | [physicalObject](ui/dataModelDocs/current/models/physicalObject)                 |
| [storage](api/docs#/storageService)         | [storageLocation](ui/dataModelDocs/current/models/storageLocation)               |
| [taxonomy](api/docs#/taxonomyService)       | [taxon](ui/dataModelDocs/current/models/taxon)                                   |
| [taxonomy](api/docs#/taxonomyService)       | [taxonName](ui/dataModelDocs/current/models/taxonName)                           |
