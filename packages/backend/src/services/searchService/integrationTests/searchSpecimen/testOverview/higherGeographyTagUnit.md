# Unit tests for higherGeographyTag

## simple

| input  | string   | matching | regexp           | errorMessage |
| ------ | -------- | -------- | ---------------- | ------------ |
| sweden |  sweden  | true     | .*( )sweden.*( ) |              |
| sweden |  europe  | false    | .*( )sweden.*( ) |              |