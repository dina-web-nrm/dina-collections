# Tests for remarkTags

 Note that | is escaped in regexp to be displayed correct in github markdown

## caseSensitivity

| input           | regexp                                                  | testString                                                                                              | matching | errorMessage |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------- | ------------ |
| ``` "A ConT ``` | ``` .*( \|\.)\"a.*( \|\.) && .*( \|\.)cont.*( \|\.) ``` |  Ur Gyldenstolpe "A Cont. to the ornth. of Northern Bolivia": Orion är belägen ca 35 km söder om Reyes  | true     |              |
| ``` "A ConT ``` | ``` .*( \|\.)\"a.*( \|\.) && .*( \|\.)cont.*( \|\.) ``` |  skin to other institutiob.                                                                             | false    |              |
| ``` "a cont ``` | ``` .*( \|\.)\"a.*( \|\.) && .*( \|\.)cont.*( \|\.) ``` |  Ur Gyldenstolpe "A Cont. to the ornth. of Northern Bolivia": Orion är belägen ca 35 km söder om Reyes  | true     |              |
| ``` "a cont ``` | ``` .*( \|\.)\"a.*( \|\.) && .*( \|\.)cont.*( \|\.) ``` |  skin to other institutiob.                                                                             | false    |              |

## complexCases

| input                      | regexp                                                             | testString                                                                                              | matching | errorMessage |
| -------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | -------- | ------------ |
| ``` other institution. ``` | ``` .*( \|\.)other.*( \|\.) && .*( \|\.)institution\..*( \|\.) ``` |  Skin to other institution.                                                                             | true     |              |
| ``` other institution. ``` | ``` .*( \|\.)other.*( \|\.) && .*( \|\.)institution\..*( \|\.) ``` |  skin to other institutiob.                                                                             | false    |              |
| ``` Gyldenstolpe Cont ```  | ``` .*( \|\.)gyldenstolpe.*( \|\.) && .*( \|\.)cont.*( \|\.) ```   |  Ur Gyldenstolpe "A Cont. to the ornth. of Northern Bolivia": Orion är belägen ca 35 km söder om Reyes  | true     |              |
| ``` Gyldenstolpe Cont ```  | ``` .*( \|\.)gyldenstolpe.*( \|\.) && .*( \|\.)cont.*( \|\.) ```   |  skin to other institutiob.                                                                             | false    |              |
| ``` "A ```                 | ``` .*( \|\.)\"a.*( \|\.) ```                                      |  Ur Gyldenstolpe "A Cont. to the ornth. of Northern Bolivia": Orion är belägen ca 35 km söder om Reyes  | true     |              |
| ``` "A ```                 | ``` .*( \|\.)\"a.*( \|\.) ```                                      |  skin to other institutiob.                                                                             | false    |              |
| ``` "A Cont. ```           | ``` .*( \|\.)\"a.*( \|\.) && .*( \|\.)cont\..*( \|\.) ```          |  Ur Gyldenstolpe "A Cont. to the ornth. of Northern Bolivia": Orion är belägen ca 35 km söder om Reyes  | true     |              |
| ``` "A Cont. ```           | ``` .*( \|\.)\"a.*( \|\.) && .*( \|\.)cont\..*( \|\.) ```          |  skin to other institutiob.                                                                             | false    |              |
| ``` "A Cont ```            | ``` .*( \|\.)\"a.*( \|\.) && .*( \|\.)cont.*( \|\.) ```            |  Ur Gyldenstolpe "A Cont. to the ornth. of Northern Bolivia": Orion är belägen ca 35 km söder om Reyes  | true     |              |
| ``` "A Cont ```            | ``` .*( \|\.)\"a.*( \|\.) && .*( \|\.)cont.*( \|\.) ```            |  skin to other institutiob.                                                                             | false    |              |
| ``` coordinates. ```       | ``` .*( \|\.)coordinates\..*( \|\.) ```                            |  Type locality in Wilson and reeder doesn't agree with my coordinates.                                  | true     |              |
| ``` coordinates. ```       | ``` .*( \|\.)coordinates\..*( \|\.) ```                            |  skin to other institutiob.                                                                             | false    |              |
| ``` doesn't ```            | ``` .*( \|\.)doesn't.*( \|\.) ```                                  |  Type locality in Wilson and reeder doesn't agree with my coordinates.                                  | true     |              |
| ``` doesn't ```            | ``` .*( \|\.)doesn't.*( \|\.) ```                                  |  skin to other institutiob.                                                                             | false    |              |
| ``` c.b.sp ```             | ``` .*( \|\.)c\.b\.sp.*( \|\.) ```                                 |  . / C.b.sp.// 1. / Sparrm.                                                                             | true     |              |
| ``` Ipssis. Sparrm ```     | ``` .*( \|\.)ipssis\..*( \|\.) && .*( \|\.)sparrm.*( \|\.) ```     |  Ipssis. / C.b.sp.// 1. / Sparrm.                                                                       | true     |              |

## notSupportedCases

| input | regexp | testString | matching | errorMessage |
| ----- | ------ | ---------- | -------- | ------------ |

## simple

| input       | regexp                        | testString                                            | matching | errorMessage |
| ----------- | ----------------------------- | ----------------------------------------------------- | -------- | ------------ |
| ``` och ``` | ``` .*( \|\.)och.*( \|\.) ``` |  Manus och pedis in skin                              | true     |              |
| ``` och ``` | ``` .*( \|\.)och.*( \|\.) ``` |  fyndet beskrivet i Fauna och flora 26:1931 269-272.  | true     |              |
| ``` och ``` | ``` .*( \|\.)och.*( \|\.) ``` |  occ                                                  | false    |              |