# Tests for higherGeographyTag

 Note that | is escaped in regexp to be displayed correct in github markdown

## simple

| input          | regexp                           | testString | matching | errorMessage |
| -------------- | -------------------------------- | ---------- | -------- | ------------ |
| ``` sweden ``` | ``` .*( \|\.)sweden.*( \|\.) ``` |  sweden    | true     |              |
| ``` sweden ``` | ``` .*( \|\.)sweden.*( \|\.) ``` |  europe    | false    |              |