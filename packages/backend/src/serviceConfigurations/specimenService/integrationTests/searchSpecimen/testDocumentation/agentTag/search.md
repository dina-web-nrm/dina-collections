# Tests for agentTag

## search

| input                                               | filter                                   | expectedCount | matchingCatalogNumbers |
| --------------------------------------------------- | ---------------------------------------- | ------------- | ---------------------- |
| returns 0 matching for non existing tagValue        | tagValue: non-existing-agent             |               |                        |
| returns 1 matching for 1 existing matching tagValue | ```[{"input":{"tagValue":"bergman"}}]``` | 1             | 583124                 |