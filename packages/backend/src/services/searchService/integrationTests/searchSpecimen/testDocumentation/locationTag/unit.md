# Tests for locationTag

 Note that | is escaped in regexp to be displayed correct in github markdown

## simple

| input           | regexp                            | testString          | matching | errorMessage |
| --------------- | --------------------------------- | ------------------- | -------- | ------------ |
| ``` rödskär ``` | ``` .*( \|\.)rödskär.*( \|\.) ``` |  bogesund, rödskär  | true     |              |
| ``` rödskär ``` | ``` .*( \|\.)rödskär.*( \|\.) ``` |  europe             | false    |              |