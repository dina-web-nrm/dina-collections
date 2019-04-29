# Tests for selectiveBreedingTag

## search

| input                                            | filter                                     | expectedCount | matchingCatalogNumbers |
| ------------------------------------------------ | ------------------------------------------ | ------------- | ---------------------- |
| returns 0 matching for non existing tagValue     | tagValue: non-existing-tag                 |               |                        |
| returns 15 matches for tagType: unknown (origin) | ```[{"input":{"tagTypes":["unknown"]}}]``` | 15            |                        |
| returns 1matches for tagType: no                 | ```[{"input":{"tagTypes":["no"]}}]```      | 1             |                        |