---
id: index
title: Common
sidebar_label: Common
---

The `common` package is home to various code that is, or could be, of use for
more than one package. Currently `backend`, `migrations` and `ui` depend on
`common`.

On the top-level, `common` contains:

- **src:** This folder has a mainly flat structure with various shared
  JavaScript functions.
- **dist:** This folder contains the styles (CSS & JS) compiled from the
  definitions in the `style` package as well as the JSON schemas for the (data)
  models and the API.

Below follows a description of what is in `src`.

## Shared JavaScript functions

| Name                   | Contents |
| ---------------------- | -------- |
| apiClient              |          |
| asyncReduce            |          |
| batch                  |          |
| buildFileTrees         |          |
| buildOperationId       |          |
| chainPromises          |          |
| constants              |          |
| coordinates            |          |
| createDeleteProperties |          |
| createLid              |          |
| date                   |          |
| Dependor               |          |
| endpointFactory        |          |
| env                    |          |
| error                  |          |
| formatObject           |          |
| fs                     |          |
| jsonApiClient          |          |
| jsonSchema             |          |
| log                    |          |
| migrator               |          |
| openApiClient          |          |
| reporter               |          |
| schemaBuilder          |          |
| schemaInterface        |          |
| scripts                |          |
| search                 |          |
| sortMethods            |          |
| storage                |          |
| stringFormatters       |          |
| testUtilities          |          |
