# Tests for agentTag

## simple

| input           | regexp                    | testString       | matching | errorMessage |
| --------------- | ------------------------- | ---------------- | -------- | ------------ |
| ``` bergman ``` | ``` .*( )bergman.*( ) ``` |  bergman         | true     |              |
| ``` bergman ``` | ``` .*( )bergman.*( ) ``` |  anpusa          | false    |              |
| ``` berg ```    | ``` .*( )berg.*( ) ```    |  bergman         | true     |              |
| ``` berg ```    | ``` .*( )berg.*( ) ```    |  bergström, ulf  | true     |              |
| ``` berg ```    | ``` .*( )berg.*( ) ```    |  ber             | false    |              |
| ``` ulf ```     | ``` .*( )ulf.*( ) ```     |  bergström, ulf  | true     |              |
| ``` ulf ```     | ``` .*( )ulf.*( ) ```     |  bergström       | false    |              |