# Tree for dataModules
## Tree
```bash
├── allModules.js
├── curatedListService
│   ├── actionCreators
│   │   ├── createFeatureType
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getFeatureType
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getFeatureTypes
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getPreparationType
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getPreparationTypes
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── updateFeatureType
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
│   ├── higherOrderComponents
│   │   ├── createGetPreparationTypeById.js
│   │   ├── ensureAllFeatureTypesFetched.js
│   │   ├── ensureAllPreparationTypesFetched.js
│   │   └── index.js
│   ├── index.js
│   ├── index.test.js
│   ├── keyObjectModule.js
│   ├── reducer
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── resources
│   │       ├── featureTypes
│   │       ├── index.js
│   │       ├── index.test.js
│   │       └── preparationTypes
│   ├── selectors.js
│   └── selectors.test.js
├── index.js
├── specimenService
│   ├── actionCreators
│   │   ├── createSpecimen
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getSpecimen
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getSpecimens
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── updateSpecimen
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
│   │       └── specimens
│   ├── selectors.js
│   ├── selectors.test.js
│   ├── utilities.js
│   └── utilities.test.js
├── storageService
│   ├── actionCreators
│   │   ├── createPhysicalObject
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── createStorageLocation
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getPhysicalObject
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getPhysicalObjects
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
│   │   ├── updatePhysicalObject
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
│   ├── higherOrderComponents
│   │   ├── createGetStorageLocationById.js
│   │   ├── ensureAllStorageLocationsFetched.js
│   │   └── index.js
│   ├── index.js
│   ├── index.test.js
│   ├── keyObjectModule.js
│   ├── reducer
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── resources
│   │       ├── index.js
│   │       ├── index.test.js
│   │       ├── physicalObjects
│   │       └── storageLocations
│   ├── selectors.js
│   └── selectors.test.js
├── taxonService
│   ├── actionCreators
│   │   ├── createTaxon
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getTaxaByName
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── getTaxon
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── updateTaxon
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
│   ├── higherOrderComponents
│   │   ├── createGetTaxonById.js
│   │   └── index.js
│   ├── index.js
│   ├── index.test.js
│   ├── mockData.js
│   ├── mockData.test.js
│   ├── reducer
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── resources
│   │       ├── index.js
│   │       ├── index.test.js
│   │       └── taxa
│   ├── selectors.js
│   └── selectors.test.js
└── tree.md

```

## Links
[root](../../tree.md)
[src](../tree.md)
[apps](../apps/tree.md)
[coreModules](../coreModules/tree.md)
[domainModules](../domainModules/tree.md)
[collectionsUi viewModules](../apps/collectionsUi/viewModules/tree.md)