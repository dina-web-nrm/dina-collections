# Tests for locationTag

## simple

| input   | string              | matching | regexp                    | errorMessage |
| ------- | ------------------- | -------- | ------------------------- | ------------ |
| rödskär |  bogesund, rödskär  | true     | ``` .*( )rödskär.*( ) ``` |              |
| rödskär |  europe             | false    | ``` .*( )rödskär.*( ) ``` |              |