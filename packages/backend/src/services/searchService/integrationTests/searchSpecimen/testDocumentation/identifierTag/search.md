# Tests for identifierTag

## search

| input                                               | filter                                  | expectedCount | matchingCatalogNumbers |
| --------------------------------------------------- | --------------------------------------- | ------------- | ---------------------- |
| returns 0 matching for non existing tagValue        | tagValue: non-existing-identifier       |               |                        |
| returns 1 matching for 1 existing matching tagValue | ```[{"input":{"tagValue":"500001"}}]``` | 1             | 500001                 |