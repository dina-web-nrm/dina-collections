# Tests for identifierTag

## tagType

| input                                                 | filter                    | expectedCount |
| ----------------------------------------------------- | ------------------------- | ------------- |
| returns all aggregated identifiers                    |                           | 35            |
| returns all aggregated catalog-no identifiers         | tagTypes: catalog-no      | 16            |
| returns all aggregated old-skeleton-no identifiers    | tagTypes: old-skeleton-no | 9             |
| returns all aggregated old-skin-no identifiers        | tagTypes: old-skin-no     | 7             |
| returns all aggregated sva-no identifiers             | tagTypes: sva-no          | 2             |
| returns all aggregated loan-no identifiers            | tagTypes: loan-no         | 1             |
| returns all aggregated loan-no and sva-no identifiers | tagTypes: loan-no,sva-no  | 3             |