# Tests for appearanceTag

## search

| input                                                               | filter                                                                                             | expectedCount | matchingCatalogNumbers |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------- | ---------------------- |
| returns 0 matching for non existing tagValue                        | tagValue: non-existing-appearance-tag                                                              |               |                        |
| returns 15 matches for matchAppearanceTags: unknown (origin)        | ```[{"filterFunction":"matchAppearanceTags","input":{"tagTypes":["unknown (origin)"]}}]```         | 15            |                        |
| returns 1 matches for matchAppearanceTags: wild and native (origin) | ```[{"filterFunction":"matchAppearanceTags","input":{"tagTypes":["wild and native (origin)"]}}]``` | 1             |                        |