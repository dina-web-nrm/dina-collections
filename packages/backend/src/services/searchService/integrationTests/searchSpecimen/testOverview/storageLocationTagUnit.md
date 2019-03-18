# Unit tests for storageLocationTag

## simple

| input    | string     | matching | regexp             | errorMessage |
| -------- | ---------- | -------- | ------------------ | ------------ |
| bensalen |  bensalen  | true     | .*( )bensalen.*( ) |              |
| bensalen |  nrm       | false    | .*( )bensalen.*( ) |              |