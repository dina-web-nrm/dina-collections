# Tests for storageLocationTag

 Note that | is escaped in regexp to be displayed correct in github markdown

## simple

| input            | regexp                             | testString | matching | errorMessage |
| ---------------- | ---------------------------------- | ---------- | -------- | ------------ |
| ``` bensalen ``` | ``` .*( \|\.)bensalen.*( \|\.) ``` |  bensalen  | true     |              |
| ``` bensalen ``` | ``` .*( \|\.)bensalen.*( \|\.) ``` |  nrm       | false    |              |