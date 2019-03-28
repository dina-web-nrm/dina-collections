# Tests for higherGeographyTag

## simple

| input          | regexp                         | testString | matching | errorMessage |
| -------------- | ------------------------------ | ---------- | -------- | ------------ |
| ``` sweden ``` | ``` .*( |\.)sweden.*( |\.) ``` |  sweden    | true     |              |
| ``` sweden ``` | ``` .*( |\.)sweden.*( |\.) ``` |  europe    | false    |              |