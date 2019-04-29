# Tests for searchDate

## search

| input                                    | filter                                                                                            | expectedCount | matchingCatalogNumbers |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------- | ---------------------- |
| returns 3 matching after 1989-12-31      | ```[{"input":{"value":{"start":"1989-12-31T23:00:00.000Z"}}}]```                                  | 3             |                        |
| returns 1 matching before 1800           | ```[{"input":{"value":{"end":"1800-01-01T22:47:47.999Z"}}}]```                                    | 1             |                        |
| returns 3 matching between 1994 and 1998 | ```[{"input":{"value":{"end":"1998-12-31T22:59:59.999Z","start":"1993-12-31T23:00:00.000Z"}}}]``` | 3             |                        |
| returns 0 matching if invalid            | ```[{"input":{"value":{"invalid":true}}}]```                                                      |               |                        |