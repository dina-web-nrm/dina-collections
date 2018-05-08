# Collection manager backend

Collection manager backend is a platform for building services. To get started read repository [README.md](../../../README.md)

## Terminology (wip)

* [Urls](documentation/terminology/urls.md)
* [Rest](documentation/terminology/rest.md)
* [BackendConcepts](documentation/terminology/backendConcepts.md)

## File structure overview

* [root](tree.md)
* [src](src/tree.md)
* [lib](src/lib/tree.md)
* [apps](src/apps/tree.md)
* [services](src/services/tree.md)

## Data relations
The backend has two primary ways to store relationships between models and they differ depending on whether the related resources belong to the same service or different services:

When the models belong to the same service, one model stores a foreign key that points to the other model, or there is a so called "through" model, that stores references to both related resources. Sequelize provides support for setting up those relationships, which they call `associations`, and ensures that the references exist.

When the models belong to different services, we use a jsonb-column in one model to store the reference to the other model. It is not possible to use Sequelize associations across services, since each service needs to be self-contained and might have a separate database. That means there is no automatic checking that a reference is valid, but it can be achieved by other means, e.g. fetching the related resource before setting the reference.

Each service contains a relations configuration in the models folder. The configuration is built from relation specifications for both internal and external relations, specifying parameters such as type of relation (e.g. hasOne or hasMany), sourceResource, targetResource and custom keys, if any. The parameter names are closely related to Sequelize's terminology, to make it easy to understand after reading Sequelize's docs, and where possible, the build methods assume reasonable defaults, so that a minimal amount of custom configuration is needed to setup new relations.

The internal relations (Sequelize associations) are setup automatically from the specifications. For external relations, it is necessary to manually extend the model schema to include the relationships data and to add any required configuration to the other service.

The relations configuration also builds and exports a resourceRelationsMap, which is imported and used in the service resource definition.
