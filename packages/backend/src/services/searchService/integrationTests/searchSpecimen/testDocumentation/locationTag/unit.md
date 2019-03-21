# Tests for locationTag

## simple

| input   | regexp                    | testString          | matching | errorMessage |
| ------- | ------------------------- | ------------------- | -------- | ------------ |
| rödskär | ``` .*( )rödskär.*( ) ``` |  bogesund, rödskär  | true     |              |
| rödskär | ``` .*( )rödskär.*( ) ``` |  europe             | false    |              |