# Tree for domainModules
## Tree
```bash
├── agent
│   ├── components
│   │   ├── AgentDropdownPickerSearch
│   │   │   └── index.js
│   │   ├── AgentDropdownSearch
│   │   │   └── index.js
│   │   ├── AgentIdTextResult
│   │   │   └── index.js
│   │   ├── AgentManager
│   │   │   ├── Base.js
│   │   │   ├── ItemTitle.js
│   │   │   ├── Local.js
│   │   │   ├── Query.js
│   │   │   ├── filter
│   │   │   ├── item
│   │   │   └── tableColumnSpecifications.js
│   │   ├── AgentRolesAccordion
│   │   │   ├── AgentRoleContent.js
│   │   │   ├── AgentRoleTitle.js
│   │   │   └── index.js
│   │   ├── TogglableAgentDropdownPickerSearch
│   │   │   └── index.js
│   │   ├── formParts
│   │   │   └── index.js
│   │   └── index.js
│   ├── constants.js
│   ├── index.js
│   ├── schemas.js
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
│   │   ├── CatalogNumberModal
│   │   │   └── index.js
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
│   ├── old-translations.json
│   ├── schemas.js
│   ├── translations.json
│   └── utilities
│       ├── buildQuery.js
│       ├── buildQuery.test.js
│       └── index.js
├── curatedList
│   ├── components
│   │   ├── CauseOfDeathDropdownSearch
│   │   │   └── index.js
│   │   ├── EstablishmentMeansTypeRadioGroup
│   │   │   └── index.js
│   │   ├── FeatureObservationDropdownSearch
│   │   │   └── index.js
│   │   ├── PreparationTypeDropdownSearch
│   │   │   └── index.js
│   │   ├── TypeSpecimenTypeDropdownSearch
│   │   │   └── index.js
│   │   ├── formParts
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
│   ├── components
│   │   ├── GeographicLevelDropdown
│   │   │   └── index.js
│   │   ├── LocalityDropdownPickerSearch
│   │   │   └── index.js
│   │   ├── LocalityDropdownSearch
│   │   │   └── index.js
│   │   ├── LocalityManager
│   │   │   ├── Base.js
│   │   │   ├── ItemTitle.js
│   │   │   ├── Local.js
│   │   │   ├── Query.js
│   │   │   ├── filter
│   │   │   ├── item
│   │   │   └── tableColumnSpecifications.js
│   │   ├── formParts
│   │   │   └── index.js
│   │   └── index.js
│   ├── constants.js
│   ├── index.js
│   ├── schemas.js
│   └── translations.json
├── storage
│   ├── __markdown__
│   │   ├── helpTexts
│   │   │   └── storageLocation
│   │   └── index.json
│   ├── components
│   │   ├── StorageLocationDropdownPickerSearch
│   │   │   └── index.js
│   │   ├── StorageLocationDropdownSearch
│   │   │   └── index.js
│   │   ├── StorageLocationLevelDropdown
│   │   │   └── index.js
│   │   ├── StorageLocationManager
│   │   │   ├── Base.js
│   │   │   ├── ItemTitle.js
│   │   │   ├── Local.js
│   │   │   ├── Query.js
│   │   │   ├── filter
│   │   │   ├── item
│   │   │   └── tableColumnSpecifications.js
│   │   ├── formParts
│   │   │   ├── PreparationTypesTable
│   │   │   ├── TaxaTable
│   │   │   └── index.js
│   │   └── index.js
│   ├── constants.js
│   ├── index.js
│   ├── schemas.js
│   └── translations.json
├── taxon
│   ├── actionCreators
│   │   ├── index.js
│   │   └── updateTaxonNameSearchQuery
│   │       ├── index.js
│   │       └── index.test.js
│   ├── actionTypes.js
│   ├── components
│   │   ├── AcceptedTaxonNameDropdownPickerSearch
│   │   │   └── index.js
│   │   ├── RankDropdown
│   │   │   └── index.js
│   │   ├── ScientificNamesTable
│   │   │   ├── NewTaxonNameRow.js
│   │   │   ├── TaxonNameRow.js
│   │   │   └── index.js
│   │   ├── TaxonDropdownPickerSearch
│   │   │   └── index.js
│   │   ├── TaxonDropdownSearch
│   │   │   └── index.js
│   │   ├── TaxonManager
│   │   │   ├── Base.js
│   │   │   ├── ItemTitle.js
│   │   │   ├── Local.js
│   │   │   ├── Query.js
│   │   │   ├── filter
│   │   │   ├── item
│   │   │   └── tableColumnSpecifications.js
│   │   ├── TaxonNameDropdownPickerSearch
│   │   │   └── index.js
│   │   ├── TaxonNameDropdownSearch
│   │   │   └── index.js
│   │   ├── TaxonNameManager
│   │   │   ├── Base.js
│   │   │   ├── Local.js
│   │   │   ├── Query.js
│   │   │   ├── filter
│   │   │   ├── item
│   │   │   └── tableColumnSpecifications.js
│   │   ├── TaxonNameTaxonStatus
│   │   │   └── index.js
│   │   ├── TaxonResult
│   │   │   └── index.js
│   │   ├── TogglableTaxonDropdownPickerSearch
│   │   │   └── index.js
│   │   ├── VernacularNamesTable
│   │   │   ├── Row.js
│   │   │   └── index.js
│   │   ├── formParts
│   │   │   └── index.js
│   │   └── index.js
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