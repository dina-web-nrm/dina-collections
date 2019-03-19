# Tests for taxonomyTag

## tagValue

| input                                               | filter                       | expectedCount |
| --------------------------------------------------- | ---------------------------- | ------------- |
| returns 0 matchingfor non existing tagValue         | tagValue: non-existing-taxon |               |
| returns 1 matching for 1 existing matching tagValue | tagValue: pusa hispida       | 1             |
| returns 2 matching for tagValue pus*                | tagValue: pus*               | 2             |
| asterisk - pu*                                      | tagValue: pu*                | 2             |
| asterisk - *pida                                    | tagValue: *pida              | 1             |
| asterisk - *lo*                                     | tagValue: *lo*               | 6             |
| asteriskAndPhrase - "mus *lo*"                      | tagValue: "mus *lo*"         | 1             |
| asteriskAndPhrase - "*lo* mus"                      | tagValue: "*lo* mus"         | 0             |
| asteriskAndSpace - *lo* mus                         | tagValue: *lo* mus           | 1             |
| asteriskAndSpace - mus *lo*                         | tagValue: mus *lo*           | 1             |
| asteriskAndSpace - mus *lo                          | tagValue: mus *lo            | 0             |
| equal - =pusa                                       | tagValue: =pusa              | 1             |
| equal - =                                           | tagValue: =                  | 0             |
| noSpecialOperators - pusa                           | tagValue: pusa               | 2             |
| noSpecialOperators - pu                             | tagValue: pu                 | 3             |
| noSpecialOperators - c                              | tagValue: c                  | 6             |
| phrases - "pusa hispida"                            | tagValue: "pusa hispida"     | 1             |
| phrases - "pusa"                                    | tagValue: "pusa"             | 1             |
| space - pusa hispida                                | tagValue: pusa hispida       | 1             |
| space - pusa  hispida                               | tagValue: pusa  hispida      | 1             |
| space - hispida pusa                                | tagValue: hispida pusa       | 1             |
| space - hispida                                     | tagValue: hispida            | 1             |
| space - mu mus                                      | tagValue: mu mus             | 5             |