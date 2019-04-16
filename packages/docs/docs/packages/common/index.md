---
id: index
title: Common
sidebar_label: Common
---

The `common` package is home to various code that is, or could be, of use for
more than one package. Currently `backend`, `migrations` and `ui` depend on
`common`.

On the top-level, `common` contains:

- **src:** This folder contains various shared JavaScript functions. It has a
  mainly flat structure, because that is how it started, but would benefit from
  grouping related functionality.
- **dist:** This folder contains the styles (CSS & JS) compiled from the
  definitions in the `style` package as well as the JSON schemas for the (data)
  models and the API.

Below follows a description of what is in `src`.

## Shared JavaScript functions

| Name                   | Contents                                                                                                                                                                                                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apiClient              | API-client factory. It is used to make HTTP requests and provides support for input/output validation, mapping input/output and headers, and formatting/parsing of body and query, to make these things more convenient.                                             |
| asyncReduce            | Utility that is similar to `Array.prototype.reduce()` but asynchronous                                                                                                                                                                                               |
| batch                  | Utility for executing operations, e.g. map or reduce, on batches of items                                                                                                                                                                                            |
| buildFileTrees         | Builds `tree.md` files showing the file structure, e.g. [common/tree.md](https://github.com/DINA-Web/dina-collections/tree/master/packages/common/tree.md)                                                                                                           |
| buildOperationId       | Utility to build a string to be used as [operationId](https://swagger.io/docs/specification/2-0/paths-and-operations/)                                                                                                                                               |
| chainPromises          | Utility to sequentially call promises with the resolved result of the previous promise                                                                                                                                                                               |
| constants              | Constants (strings) shared between packages                                                                                                                                                                                                                          |
| coordinates            | Utility to convert latitude/longitude between decimal degrees and degrees, minutes and seconds.                                                                                                                                                                      |
| createDeleteProperties | Utility factory to delete object properties of a certain value                                                                                                                                                                                                       |
| createLid              | Utility to create a unique "local" id (used when database id is not enough)                                                                                                                                                                                          |
| date                   | Utilities to build dates on different formats and to convert between them                                                                                                                                                                                            |
| Dependor               | Utility used to mock dependencies in tests                                                                                                                                                                                                                           |
| endpointFactory        | Utility to create endpoint configurations. Has different entries for client and server in order to avoid including `json-schema-faker` in the client-side (ui) production bundle.                                                                                    |
| env                    | Utilities to read and resolve environment variables                                                                                                                                                                                                                  |
| error                  | Error handling including error codes and error factories for different kinds of errors, as well as general validation functions comparing to a schema and specific validation functions with custom logic (e.g. dates).                                              |
| execCmd                | Utility to execute a command in a Node child process. Defaults to run from the repository root.                                                                                                                                                                      |
| findRootPath           | Utility to find the repository root path                                                                                                                                                                                                                             |
| formatObject           | Utilities to convert data between the "core" format, i.e. as defined in the JSON schema (e.g. with `attributes`, `id` and `relationships`), and the "nested" format, i.e. with related resources inserted into the root resource instead of being referred to by id. |
| jsonApiClient          | Extends the `openApiClient` factory to add CRUD methods that handle filtering and relationships, based on how they are specified in the JSON API schema.                                                                                                             |
| jsonSchema             | Functions to validate data against the JSON schema and to generate mock data based on the schema                                                                                                                                                                     |
| log                    | Factory for logging to the console with levels or a tree structure                                                                                                                                                                                                   |
| migrator               | A set of functions for migrating data from one object to another                                                                                                                                                                                                     |
| openApiClient          | Patches the `apiClient` factory to make `call` take an endpoint config or an OpenAPI [operationId](https://swagger.io/docs/specification/2-0/paths-and-operations/).                                                                                                 |
| reporter               | Factory for creating reports when migrating data or rebuilding data views                                                                                                                                                                                            |
| schemaBuilder          | Utilities to build the models and Open API schemas                                                                                                                                                                                                                   |
| schemaInterface        | A set of functions for reading information from the schema. Used to avoid directly importing/requiring the schema in many places.                                                                                                                                    |
| scripts                | Contains scripts used internally in the common package (shared scripts should be in the `scripts` package).                                                                                                                                                          |
| search                 | A set of functions for filtering and mapping, both general and specific to certain resources or attributes                                                                                                                                                           |
| storage                | Utility to extract storage location name with parent suffix                                                                                                                                                                                                          |
| stringFormatters       | Utilities to format strings                                                                                                                                                                                                                                          |
| testUtilities          | Utilities for more control over which tests to run in different suites                                                                                                                                                                                               |
