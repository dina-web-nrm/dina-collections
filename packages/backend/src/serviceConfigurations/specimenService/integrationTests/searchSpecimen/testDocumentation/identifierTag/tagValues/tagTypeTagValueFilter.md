# Tests for identifierTag

## tagTypeTagValue

| input                                                                    | filter                                       | expectedCount |
| ------------------------------------------------------------------------ | -------------------------------------------- | ------------- |
| returns 0 matching catalog-no identifiers for non existing tagValue      | tagTypes: catalog-no, tagValue: 11111        |               |
| returns 7 matching identifiers for 5*                                    | tagTypes: catalog-no, tagValue: 5*           | 7             |
| returns 1 matching identifiers for 500001                                | tagTypes: catalog-no, tagValue: 500001       | 1             |
| returns 0 matching old-skeleton-no identifiers for non existing tagValue | tagTypes: old-skeleton-no, tagValue: 11111   |               |
| returns 1 matching identifiers for 1*                                    | tagTypes: old-skeleton-no, tagValue: 5*      | 1             |
| returns 1 matching identifiers for 1,285                                 | tagTypes: old-skeleton-no, tagValue: 1,285   | 1             |
| returns 0 matching old-skin-no identifiers for non existing tagValue     | tagTypes: old-skin-no, tagValue: 11111       |               |
| returns 2 matching identifiers for 1*                                    | tagTypes: old-skin-no, tagValue: 1*          | 2             |
| returns 1 matching identifiers for 1; 4406; 52                           | tagTypes: old-skin-no, tagValue: 1; 4406; 52 | 1             |
| returns 0 matching sva-no identifiers for non existing tagValue          | tagTypes: sva-no, tagValue: 11111            |               |
| returns 2 matching identifiers for 5*                                    | tagTypes: sva-no, tagValue: v0*              | 2             |
| returns 1 matching identifiers for v0253/98                              | tagTypes: sva-no, tagValue: v0253/98         | 1             |
| returns 0 matching loan-no identifiers for non existing tagValue         | tagTypes: loan-no, tagValue: 11111           |               |
| returns 1 matching identifiers for 20*                                   | tagTypes: loan-no, tagValue: 20*             | 1             |
| returns 1 matching identifiers for 2012-21                               | tagTypes: loan-no, tagValue: 2012-21         | 1             |