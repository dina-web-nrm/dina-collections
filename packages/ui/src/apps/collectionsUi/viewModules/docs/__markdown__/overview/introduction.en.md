# Datamodel documentation

This is the official data model documentation for DINA Collections. Browse the
navigation to the left to explore the content.

The data model consists of three architectural layers:

- _Services_ (e.g. agentService and specimenService)
- _Models_ (e.g. acquisition and determination)
- _Properties_ (e.g. remarks in the model acquisition)

The data model has been made generic in order to eventually support all kinds of
natural history collections. We have tried to define the models so that it is
clear how they should be be used.

## Services overview

The system is built around a number of services which are briefly described
here.

[service overview picture](/images/servicesOverview.pdf)

### agentService

Service with information about people, groups and organizations.

Example models: [affiliation](__DOCLINK__affiliation),
[normalizedAgent](__DOCLINK__individual), [role](__DOCLINK__role)

### authService

Service for authentication and authorization.

Example models: [user](__DOCLINK__user)

### curatedListService

Service for keeping controlled vocabularies.

Example models: [causeOfDeathType](__DOCLINK__causeOfDeathType),
[identifierType](__DOCLINK__identifierType),
[selectableValue](__DOCLINK__selectableValues)

### historyService

Service for keeping track of changes to the data.

Example models: [resourceActivity](__DOCLINK__resourceActivity)

### identifierService

Service for keeping identifiers put on specimens and other things.

Example models: [catalogNumber](__DOCLINK__catalogNumber)

### migrationService

Service for keeping track of changes to the data model.

Example models: [dataModelMigrationLog]((**DOCLINK**dataModelMigrationLog)

### placeService

Service with information about defined places and geographic areas.

Example models: [place]((**DOCLINK**place)

### specimenService

Service that holds most of the information about specimens.

One of the challenges with building a generic data model is different cataloging
practices. What a catalog number refers to can differ between collections. To
accommodate that variation, we have introduced a special model called
_specimen_. This model differs from the others in that it is extremely flexible:
a specimen is simply the "things" you register under the same catalog number.

In the current implementation is _individual_ the root model within specimen,
which means that each specimen corresponds to one individual. A future
collection may use a different configuration with for example _collectionItem_
or _event_ as the root.

Example models: [acquisition](__DOCLINK__acquisition),
[collectionItem](__DOCLINK__collectionItem),
[determination](__DOCLINK__determination), [individual]((**DOCLINK**individual),
[specimen](__DOCLINK__specimen)

[specimen service overview picture](/images/specimenServiceOverview.pdf)

### storageService

Service with information about physical objects and where they are stored.

Example models: [physicalObject](__DOCLINK__physicalObject),
[storageLocation](__DOCLINK__storageLocation)

### taxonomyService

Service with information about taxa and taxon names. This is the place where the
local taxonomic classification is stored.

Example models: [taxon](__DOCLINK__taxon), [taxonName](__DOCLINK__taxonName)
