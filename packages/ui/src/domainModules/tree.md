# Tree for domainModules
Generated at: 2018-03-13T11:53:29.334Z
## Tree
```bash
├── allModules.js
├── collectionMammals
│   ├── __markdown__
│   │   ├── catalogNumber
│   │   │   ├── addCatalogNumberModal.en.md
│   │   │   └── addCatalogNumberModal.sv.md
│   │   ├── index.json
│   │   └── occurrences
│   │       └── localityInformation
│   ├── actionCreators
│   │   ├── clearSearchParameters.js
│   │   ├── createSpecimen.js
│   │   ├── getIndividualGroupByCatalogNumber.js
│   │   ├── getSpecimen.js
│   │   ├── index.js
│   │   ├── lookupMammals.js
│   │   ├── setAccordionActiveIndex.js
│   │   ├── updateFeatureTypeNameSearchQuery.js
│   │   ├── updateLocalityInformationSearchQuery.js
│   │   ├── updateSearchParameter.js
│   │   ├── updateSpecimen.js
│   │   └── utilities
│   │       └── buildSpecimenBody.js
│   ├── actionTypes.js
│   ├── components
│   │   ├── FeatureTypeNameDropdown
│   │   │   └── index.js
│   │   ├── LocalityDropdownSearch
│   │   │   └── index.js
│   │   ├── LookupMammals
│   │   │   └── index.js
│   │   ├── MammalForm
│   │   │   ├── CatalogNumberInput
│   │   │   ├── Scenarios
│   │   │   ├── SegmentCatalogNumberIdentifier
│   │   │   ├── SegmentDeterminations
│   │   │   ├── SegmentDistinguishedUnits
│   │   │   ├── SegmentFeatureObservations
│   │   │   ├── SegmentIndividualCircumstances
│   │   │   ├── SegmentOther
│   │   │   ├── WIP\ object\ shapes
│   │   │   ├── index.js
│   │   │   └── transformations
│   │   └── index.js
│   ├── constants.js
│   ├── endpoints.js
│   ├── globalSelectors.js
│   ├── index.js
│   ├── middleware.js
│   ├── mockData.js
│   ├── reducer.js
│   ├── selectors.js
│   ├── translations.json
│   └── utilities.js
├── curatedListService
│   ├── actionCreators
│   │   ├── createFeatureObservationType
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getFeatureObservationType
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getFeatureObservationTypes
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── updateFeatureObservationType
│   │       ├── index.js
│   │       └── index.test.js
│   ├── actionTypes.js
│   ├── actionTypes.test.js
│   ├── constants.js
│   ├── constants.test.js
│   ├── endpoints.js
│   ├── endpoints.test.js
│   ├── globalSelectors.js
│   ├── globalSelectors.test.js
│   ├── index.js
│   ├── index.test.js
│   ├── reducer
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── resources
│   │       ├── featureObservationTypes
│   │       ├── index.js
│   │       └── index.test.js
│   ├── selectors.js
│   └── selectors.test.js
├── identifierService
│   ├── actionCreators
│   │   ├── createCatalogNumber
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getCatalogNumber
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getCatalogNumbers
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── updateCatalogNumber
│   │       ├── index.js
│   │       └── index.test.js
│   ├── actionTypes.js
│   ├── actionTypes.test.js
│   ├── constants.js
│   ├── constants.test.js
│   ├── endpoints.js
│   ├── endpoints.test.js
│   ├── globalSelectors.js
│   ├── globalSelectors.test.js
│   ├── index.js
│   ├── index.test.js
│   ├── reducer
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── resources
│   │       ├── catalogNumbers
│   │       ├── index.js
│   │       └── index.test.js
│   ├── selectors.js
│   └── selectors.test.js
├── index.js
├── localityService
│   ├── actionCreators
│   │   ├── createCuratedLocality
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getCuratedLocalities
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getCuratedLocality
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── updateCuratedLocality
│   │       ├── index.js
│   │       └── index.test.js
│   ├── actionTypes.js
│   ├── actionTypes.test.js
│   ├── constants.js
│   ├── constants.test.js
│   ├── endpoints.js
│   ├── endpoints.test.js
│   ├── globalSelectors.js
│   ├── globalSelectors.test.js
│   ├── index.js
│   ├── index.test.js
│   ├── mockData.js
│   ├── mockData.test.js
│   ├── reducer
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── resources
│   │       ├── curatedLocalities
│   │       ├── index.js
│   │       └── index.test.js
│   ├── selectors.js
│   └── selectors.test.js
├── storageService
│   ├── actionCreators
│   │   ├── createPhysicalUnit
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── createStorageLocation
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getPhysicalUnit
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getPhysicalUnits
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getStorageLocation
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getStorageLocations
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── index.js
│   │   ├── index.test.js
│   │   ├── updatePhysicalUnit
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   └── updateStorageLocation
│   │       ├── index.js
│   │       └── index.test.js
│   ├── actionTypes.js
│   ├── actionTypes.test.js
│   ├── constants.js
│   ├── constants.test.js
│   ├── endpoints.js
│   ├── endpoints.test.js
│   ├── globalSelectors.js
│   ├── globalSelectors.test.js
│   ├── index.js
│   ├── index.test.js
│   ├── reducer
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── resources
│   │       ├── index.js
│   │       ├── index.test.js
│   │       ├── physicalUnits
│   │       └── storageLocations
│   ├── selectors.js
│   └── selectors.test.js
├── taxonomy
│   ├── actionCreators
│   │   ├── clearTaxonSearch.js
│   │   ├── fetchTaxonSearchResults.js
│   │   ├── index.js
│   │   └── updateTaxonSearchFilterName.js
│   ├── actionTypes.js
│   ├── components
│   │   ├── TaxonNameSearchInputWithResults
│   │   │   └── index.js
│   │   ├── TaxonNameSearchResult
│   │   │   └── index.js
│   │   └── index.js
│   ├── constants.js
│   ├── endpoints.js
│   ├── globalSelectors.js
│   ├── index.js
│   ├── middleware.js
│   ├── mockData.js
│   ├── reducer.js
│   └── selectors.js
└── tree.md

```

## Links
[root](../../tree.md)
[src](../tree.md)
[apps](../apps/tree.md)
[coreModules](../coreModules/tree.md)
[collectionsUi viewModules](../apps/collectionsUi/viewModules/tree.md)