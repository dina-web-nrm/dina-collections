# Tests for lengthTag

## search

| input                                                                          | filter                                                                                              | expectedCount | matchingCatalogNumbers |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------- | ---------------------- |
| returns 2 match for total-length between 0 and 1000 for unspecified range unit | ```[{"input":{"value":{"max":1000,"min":0,"rangeUnit":"unspecified","tagType":"total-length"}}}]``` | 2             | 825005<br>628009       |