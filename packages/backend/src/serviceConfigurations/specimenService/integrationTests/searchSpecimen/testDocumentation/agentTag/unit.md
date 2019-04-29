# Tests for agentTag

 Note that | is escaped in regexp to be displayed correct in github markdown

## simple

| input           | regexp                            | testString       | matching | errorMessage |
| --------------- | --------------------------------- | ---------------- | -------- | ------------ |
| ``` bergman ``` | ``` .*( \|\.)bergman.*( \|\.) ``` |  bergman         | true     |              |
| ``` bergman ``` | ``` .*( \|\.)bergman.*( \|\.) ``` |  anpusa          | false    |              |
| ``` berg ```    | ``` .*( \|\.)berg.*( \|\.) ```    |  bergman         | true     |              |
| ``` berg ```    | ``` .*( \|\.)berg.*( \|\.) ```    |  bergström, ulf  | true     |              |
| ``` berg ```    | ``` .*( \|\.)berg.*( \|\.) ```    |  ber             | false    |              |
| ``` ulf ```     | ``` .*( \|\.)ulf.*( \|\.) ```     |  bergström, ulf  | true     |              |
| ``` ulf ```     | ``` .*( \|\.)ulf.*( \|\.) ```     |  bergström       | false    |              |