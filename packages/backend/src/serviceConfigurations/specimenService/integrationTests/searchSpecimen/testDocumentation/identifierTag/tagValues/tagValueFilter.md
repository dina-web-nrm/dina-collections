# Tests for identifierTag

## tagValue

| input                                                      | filter                | expectedCount |
| ---------------------------------------------------------- | --------------------- | ------------- |
| returns 0 matching identifiers for non existing tagValue   | tagValue: 11111       |               |
| returns 1 matching identifiers for exact matching tagValue | tagValue: 530183      | 1             |
| returns 1 matching identifiers for 53018*                  | tagValue: 53018*      | 1             |
| returns 2 matching identifiers for 53*                     | tagValue: 53*         | 2             |
| returns 10 matching identifiers for 5*                     | tagValue: 5*          | 10            |
| returns 25 matching identifiers for *5*                    | tagValue: *5*         | 25            |
| specialCharacters - 1; 4406; 52                            | tagValue: 1; 4406; 52 | 1             |
| specialCharacters - v0253/98                               | tagValue: v0253/98    | 1             |
| specialCharacters - 1;                                     | tagValue: 1;          | 2             |
| specialCharacters - *-*                                    | tagValue: *-*         | 1             |
| specialCharacters - */*                                    | tagValue: */*         | 2             |
| specialCharacters - *,*                                    | tagValue: *,*         | 3             |
| specialCharacters - " "                                    | tagValue: " "         | 3             |
| specialCharacters - *;*                                    | tagValue: *;*         | 2             |