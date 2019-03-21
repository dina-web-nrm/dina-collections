# Tests for otherPreparationTag

## search

| input                                                        | filter                                                                                                        | expectedCount | matchingCatalogNumbers |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ------------- | ---------------------- |
| returns 0 matching for non existing tagValue                 | tagValue: non-existing-tag                                                                                    |               |                        |
| returns 15 matches for tagType: no other preparation         | ```[{"filterFunction":"matchOtherPreparationTags","input":{"tagTypes":["no other preparation"]}}]```          | 12            |                        |
| returns 1 matches for tagType: unspecified other preparation | ```[{"filterFunction":"matchOtherPreparationTags","input":{"tagTypes":["unspecified other preparation"]}}]``` | 4             |                        |