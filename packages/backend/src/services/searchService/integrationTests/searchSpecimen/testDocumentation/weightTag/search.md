# Tests for weightTag

## search

| input                                                                                 | filter                                                                                                     | expectedCount | matchingCatalogNumbers |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------- | ---------------------- |
| returns 1 match for complete-body-weight between 10 and 11 for unspecified range unit | ```[{"input":{"value":{"max":11,"min":10,"rangeUnit":"unspecified","tagType":"complete-body-weight"}}}]``` | 1             | 985729                 |
| returns 1 match for unknown-weight-type below 10000 for unspecified range unit        | ```[{"input":{"value":{"max":10000,"rangeUnit":"unspecified","tagType":"unknown-weight-type"}}}]```        | 1             | 956051                 |
| returns 0 match for complete-body-weight between 10 and 11 for cm range unit          | ```[{"input":{"value":{"max":11,"min":10,"rangeUnit":"cm","tagType":"complete-body-weight"}}}]```          |               |                        |