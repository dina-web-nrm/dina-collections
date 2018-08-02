# Tree for domainModules
## Tree
```bash
├── agent
│   ├── actionCreators
│   │   ├── index.js
│   │   ├── redirectToNext.js
│   │   └── redirectToPrev.js
│   ├── components
│   │   ├── AdvancedAgentDropdownSearch
│   │   │   └── index.js
│   │   ├── AgentDropdownSearch
│   │   │   └── index.js
│   │   ├── AgentManager
│   │   │   └── index.js
│   │   ├── collection
│   │   │   └── AgentList
│   │   ├── index.js
│   │   ├── item
│   │   │   ├── Inspect
│   │   │   └── form
│   │   └── shared
│   │       ├── RolesTable.js
│   │       └── RolesTableRow.js
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── globalSelectors.test.js
│   ├── index.js
│   ├── keyObjectModule.js
│   └── translations.json
├── allModules.js
├── collectionMammals
│   ├── __markdown__
│   │   ├── helpTexts
│   │   │   └── individual
│   │   ├── index.json
│   │   ├── occurrences
│   │   │   └── locationInformation
│   │   └── other
│   │       ├── addCatalogNumberModal.en.md
│   │       └── addCatalogNumberModal.sv.md
│   ├── actionCreators
│   │   ├── clearSearchParameters.js
│   │   ├── index.js
│   │   ├── lookupMammals.js
│   │   └── updateSearchParameter.js
│   ├── actionTypes.js
│   ├── components
│   │   ├── CreateSpecimen
│   │   │   └── index.js
│   │   ├── LookupMammals
│   │   │   ├── CheckboxesForm.js
│   │   │   ├── CollectingLocationMultipleSearch.js
│   │   │   ├── Filter.js
│   │   │   ├── Result.js
│   │   │   ├── Row.js
│   │   │   └── index.js
│   │   ├── MammalForm
│   │   │   ├── FormActions.js
│   │   │   ├── Scenarios
│   │   │   ├── SegmentCollectionItems
│   │   │   ├── SegmentEvents
│   │   │   ├── SegmentFeatureObservations
│   │   │   ├── SegmentIdentifiers
│   │   │   ├── SegmentOther
│   │   │   ├── SegmentTaxon
│   │   │   ├── index.js
│   │   │   └── transformations
│   │   ├── MammalManager
│   │   │   ├── FilterColumn
│   │   │   ├── MainColumn
│   │   │   └── index.js
│   │   └── index.js
│   ├── constants.js
│   ├── endpoints.js
│   ├── globalSelectors.js
│   ├── index.js
│   ├── keyObjectModule.js
│   ├── mockData.js
│   ├── old-translations.json
│   ├── schemas.js
│   ├── translations.json
│   └── utilities.js
├── curatedList
│   ├── components
│   │   ├── FeatureObservationDropdownSearch
│   │   │   └── index.js
│   │   ├── PreparationTypeDropdownSearch
│   │   │   └── index.js
│   │   └── index.js
│   ├── constants.js
│   ├── globalSelectorFactories.js
│   ├── globalSelectorFactories.test.js
│   ├── globalSelectors.js
│   ├── globalSelectors.test.js
│   └── index.js
├── index.js
├── locality
│   ├── actionCreators
│   │   ├── index.js
│   │   ├── redirectToNext.js
│   │   └── redirectToPrev.js
│   ├── components
│   │   ├── AdvancedLocalityDropdownSearch
│   │   │   └── index.js
│   │   ├── LocalityDropdownSearch
│   │   │   └── index.js
│   │   ├── LocalityManager
│   │   │   └── index.js
│   │   ├── collection
│   │   │   ├── LocalityList
│   │   │   └── LocalityTree
│   │   ├── index.js
│   │   └── item
│   │       ├── Inspect
│   │       └── form
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── globalSelectors.test.js
│   ├── index.js
│   ├── keyObjectModule.js
│   └── translations.json
├── storage
│   ├── __markdown__
│   │   ├── helpTexts
│   │   │   └── storageLocation
│   │   └── index.json
│   ├── components
│   │   ├── StorageLocationDropdownSearch
│   │   │   └── index.js
│   │   ├── StorageLocationManager
│   │   │   └── index.js
│   │   ├── collection
│   │   │   ├── StorageLocationsList
│   │   │   └── StorageLocationsTree
│   │   ├── index.js
│   │   └── item
│   │       ├── Inspect
│   │       ├── form
│   │       └── shared
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── index.js
│   ├── keyObjectModule.js
│   └── translations.json
├── taxon
│   ├── actionCreators
│   │   ├── index.js
│   │   └── updateTaxonNameSearchQuery
│   │       ├── index.js
│   │       └── index.test.js
│   ├── actionTypes.js
│   ├── components
│   │   ├── TaxonNameSearchInputWithResults
│   │   │   └── index.js
│   │   ├── TaxonSearchInputWithResults
│   │   │   └── index.js
│   │   ├── TaxonomyManager
│   │   │   └── index.js
│   │   ├── collection
│   │   │   ├── TaxonList
│   │   │   ├── TaxonNameList
│   │   │   └── TaxonTree
│   │   ├── index.js
│   │   └── item
│   │       ├── taxon
│   │       └── taxonName
│   ├── constants.js
│   ├── globalSelectors.js
│   ├── globalSelectors.test.js
│   ├── index.js
│   ├── middleware.js
│   ├── reducer
│   │   ├── index.js
│   │   └── lookup
│   │       ├── index.js
│   │       └── index.test.js
│   ├── schemas.js
│   ├── selectors.js
│   ├── selectors.test.js
│   ├── translations.json
│   ├── utilities.js
│   └── utilities.test.js
└── tree.md

```

## Links
[root](../../tree.md)
[src](../tree.md)
[apps](../apps/tree.md)
[coreModules](../coreModules/tree.md)
[collectionsUi viewModules](../apps/collectionsUi/viewModules/tree.md)