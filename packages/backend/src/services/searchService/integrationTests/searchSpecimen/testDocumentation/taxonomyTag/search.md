# Tests for taxonomyTag

## search

| input                                                                                | filter                                                                                                              | expectedCount | matchingCatalogNumbers |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------- | ---------------------- |
| returns 0 matching for non existing tagValue                                         | tagValue: non-existing-identifier                                                                                   |               |                        |
| returns 1 match for matchCuratorialTaxonRank: genus                                  | ```[{"filterFunction":"matchCuratorialTaxonRank","input":{"value":"genus"}}]```                                     | 1             | 630096                 |
| returns 1 match for matchCuratorialTaxonRank: genus and tagType: genus, tagValue: an | ```[{"filterFunction":"matchCuratorialTaxonRank","input":{"value":"genus"}},{"tagType":"genus","tagValue":"an"}]``` | 1             | 630096                 |
| returns 0 match for matchCuratorialTaxonRank: family and tagValue: an                | ```[{"filterFunction":"matchCuratorialTaxonRank","input":{"value":"family"}},{"tagValue":"an"}]```                  |               |                        |