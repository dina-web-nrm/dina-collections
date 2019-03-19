# Tests for taxonomyTag

## tagType

| input                              | filter            | expectedCount |
| ---------------------------------- | ----------------- | ------------- |
| returns all aggregated  tags       |                   | 38            |
| returns all aggregated family tags | tagTypes: family  | 10            |
| returns all genus tags             | tagTypes: genus   | 12            |
| returns all order tags             | tagTypes: order   | 5             |
| returns all species tags           | tagTypes: species | 11            |