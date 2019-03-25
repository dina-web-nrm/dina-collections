# Tests for storageLocationTag

## simple

| input            | regexp                     | testString | matching | errorMessage |
| ---------------- | -------------------------- | ---------- | -------- | ------------ |
| ``` bensalen ``` | ``` .*( )bensalen.*( ) ``` |  bensalen  | true     |              |
| ``` bensalen ``` | ``` .*( )bensalen.*( ) ``` |  nrm       | false    |              |