# Tests for agentTag

## tagValue

| input            | filter            | expectedCount |
| ---------------- | ----------------- | ------------- |
| simple - bergman | tagValue: bergman | 1             |
| simple - berg    | tagValue: berg    | 2             |
| simple - ulf     | tagValue: ulf     | 1             |