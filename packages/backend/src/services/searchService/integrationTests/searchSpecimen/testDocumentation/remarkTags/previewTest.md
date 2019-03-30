# Tests for remarkTags

## undefined

| input                                                 | filter                 | expectedCount |
| ----------------------------------------------------- | ---------------------- | ------------- |
| Return 2 aggregated testPreview for search string och | input: [object Object] | 2             |
| Phrase returns 0 matches                              | input: [object Object] |               |
| caseSensitivity - "A ConT                             | input: [object Object] | 1             |
| caseSensitivity - "a cont                             | input: [object Object] | 1             |
| complexCases - other institution.                     | input: [object Object] | 1             |
| complexCases - Gyldenstolpe Cont                      | input: [object Object] | 1             |
| complexCases - "A                                     | input: [object Object] | 1             |
| complexCases - "A Cont.                               | input: [object Object] | 1             |
| complexCases - "A Cont                                | input: [object Object] | 1             |
| complexCases - coordinates.                           | input: [object Object] | 1             |
| complexCases - doesn't                                | input: [object Object] | 1             |
| complexCases - c.b.sp                                 | input: [object Object] | 1             |
| complexCases - Ipssis. Sparrm                         | input: [object Object] | 1             |
| simple - och                                          | input: [object Object] | 2             |