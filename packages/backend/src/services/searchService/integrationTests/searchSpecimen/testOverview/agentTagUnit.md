# Unit tests for agentTag

## simple

| input   | string           | matching | regexp            | errorMessage |
| ------- | ---------------- | -------- | ----------------- | ------------ |
| bergman |  bergman         | true     | .*( )bergman.*( ) |              |
| bergman |  anpusa          | false    | .*( )bergman.*( ) |              |
| berg    |  bergman         | true     | .*( )berg.*( )    |              |
| berg    |  bergström, ulf  | true     | .*( )berg.*( )    |              |
| berg    |  ber             | false    | .*( )berg.*( )    |              |
| ulf     |  bergström, ulf  | true     | .*( )ulf.*( )     |              |
| ulf     |  bergström       | false    | .*( )ulf.*( )     |              |