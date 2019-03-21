# Tests for taxonomyTag

## asterisk

| input | regexp                 | testString          | matching | errorMessage      |
| ----- | ---------------------- | ------------------- | -------- | ----------------- |
| pu*   | ``` .*( )pu.*( ) ```   |  pusa               | true     |                   |
| pu*   | ``` .*( )pu.*( ) ```   |  pusa hispida       | true     |                   |
| pu*   | ``` .*( )pu.*( ) ```   |  rhabdomys pumilio  | true     |                   |
| pu*   | ``` .*( )pu.*( ) ```   |  hispida            | false    |                   |
| *pida | ``` .*( ).*pida( ) ``` |  pusa hispida       | true     |                   |
| *pida | ``` .*( ).*pida( ) ``` |  pusa               | false    |                   |
| his*  | ``` .*( )his.*( ) ```  |  pusa hispida       | true     |                   |
| his*  | ``` .*( )his.*( ) ```  |  pusa               | false    |                   |
| *lo*  | ``` .*( ).*lo.*( ) ``` |  gulo               | true     |                   |
| *lo*  | ``` .*( ).*lo.*( ) ``` |  gulo gulo          | true     |                   |
| *lo*  | ``` .*( ).*lo.*( ) ``` |  phyllostomidae     | true     |                   |
| *lo*  | ``` .*( ).*lo.*( ) ``` |  alouatta           | true     |                   |
| *lo*  | ``` .*( ).*lo.*( ) ``` |  alouatta caraya    | true     |                   |
| *lo*  | ``` .*( ).*lo.*( ) ``` |  mus musculoides    | true     |                   |
| *lo*  | ``` .*( ).*lo.*( ) ``` |  pusa hispida       | false    |                   |
| *lo*  | ``` .*( ).*lo.*( ) ``` |  pusa               | false    |                   |
| **    |                        |                     | false    | ** is not allowed |

## asteriskAndPhrase

| input      | regexp                       | testString        | matching | errorMessage |
| ---------- | ---------------------------- | ----------------- | -------- | ------------ |
| "mus *lo*" | ``` ^.*( )mus .*lo.*( )$ ``` |  mus musculoides  | true     |              |
| "mus *lo*" | ``` ^.*( )mus .*lo.*( )$ ``` |  musculoides mus  | false    |              |
| "*lo* mus" | ``` ^.*( ).*lo.* mus( )$ ``` |  mus              | false    |              |
| "*lo* mus" | ``` ^.*( ).*lo.* mus( )$ ``` |  mus musculoides  | false    |              |

## asteriskAndSpace

| input    | regexp                                      | testString        | matching | errorMessage |
| -------- | ------------------------------------------- | ----------------- | -------- | ------------ |
| *lo* mus | ``` .*.*( ).*lo.*( ) && .*.*( )mus.*( ) ``` |  mus musculoides  | true     |              |
| *lo* mus | ``` .*.*( ).*lo.*( ) && .*.*( )mus.*( ) ``` |  mus              | false    |              |
| mus *lo* | ``` .*.*( )mus.*( ) && .*.*( ).*lo.*( ) ``` |  mus musculoides  | true     |              |
| mus *lo* | ``` .*.*( )mus.*( ) && .*.*( ).*lo.*( ) ``` |  mus              | false    |              |
| mus *lo  | ``` .*.*( )mus.*( ) && .*.*( ).*lo( ) ```   |  mus              | false    |              |
| mus *lo  | ``` .*.*( )mus.*( ) && .*.*( ).*lo( ) ```   |  mus musculoides  | false    |              |

## equal

| input | regexp                                       | testString | matching | errorMessage |
| ----- | -------------------------------------------- | ---------- | -------- | ------------ |
| =pusa | ``` ( )pusa( ) ```                           |  pusa      | true     |              |
| =pusa | ``` ( )pusa( ) ```                           |  pusan     | false    |              |
| =pu   | ``` ( )pu( ) ```                             |  pusa      | false    |              |
| =     | ``` this-should-not-be-matching-anything ``` |  pusan     | false    |              |
| =     | ``` this-should-not-be-matching-anything ``` |  c         | false    |              |

## invalidInput

| input  | regexp | testString | matching | errorMessage                      |
| ------ | ------ | ---------- | -------- | --------------------------------- |
| =mus*  |        |            | false    | not allowed to combine = and *    |
| ="mus" |        |            | false    | not allowed to combine = and      |
| +      |        |            | false    | input contains invalid characters |
| .      |        |            | false    | input contains invalid characters |

## noSpecialOperators

| input | regexp                 | testString            | matching | errorMessage |
| ----- | ---------------------- | --------------------- | -------- | ------------ |
| pusa  | ``` .*( )pusa.*( ) ``` |  pusa                 | true     |              |
| pusa  | ``` .*( )pusa.*( ) ``` |  pusa hispida         | true     |              |
| pusa  | ``` .*( )pusa.*( ) ``` |  anpusa               | false    |              |
| pu    | ``` .*( )pu.*( ) ```   |  pusa                 | true     |              |
| pu    | ``` .*( )pu.*( ) ```   |  pusa hispida         | true     |              |
| pu    | ``` .*( )pu.*( ) ```   |  rhabdomys pumilio    | true     |              |
| pu    | ``` .*( )pu.*( ) ```   |  anpusa               | false    |              |
| pu    | ``` .*( )pu.*( ) ```   |  test anpusi piu      | false    |              |
| c     | ``` .*( )c.*( ) ```    |  carnivora            | true     |              |
| c     | ``` .*( )c.*( ) ```    |  chiroptera           | true     |              |
| c     | ``` .*( )c.*( ) ```    |  cervidae             | true     |              |
| c     | ``` .*( )c.*( ) ```    |  capreolus            | true     |              |
| c     | ``` .*( )c.*( ) ```    |  alouatta caraya      | true     |              |
| c     | ``` .*( )c.*( ) ```    |  capreolus capreolus  | true     |              |
| c     | ``` .*( )c.*( ) ```    |  ac                   | false    |              |

## phrases

| input          | regexp                       | testString     | matching | errorMessage           |
| -------------- | ---------------------------- | -------------- | -------- | ---------------------- |
| "pusa hispida" | ``` ^( )pusa hispida( )$ ``` |  pusa hispida  | true     |                        |
| "pusa hispida" | ``` ^( )pusa hispida( )$ ``` |  pusa          | false    |                        |
| "pusa hispida" | ``` ^( )pusa hispida( )$ ``` |  hispida pusa  | false    |                        |
| "pusa hisp"    | ``` ^( )pusa hisp( )$ ```    |  pusa hispida  | false    |                        |
| "pusa hisp"    | ``` ^( )pusa hisp( )$ ```    |  pusa          | false    |                        |
| "pusa hisp"    | ``` ^( )pusa hisp( )$ ```    |  hispida pusa  | false    |                        |
| "pusa"         | ``` ^( )pusa( )$ ```         |  pusa          | true     |                        |
| "pusa"         | ``` ^( )pusa( )$ ```         |  pusa hispida  | false    |                        |
| "pusa"         | ``` ^( )pusa( )$ ```         |  hispida pusa  | false    |                        |
| "hispida pusa" | ``` ^( )hispida pusa( )$ ``` |  pusa hispida  | false    |                        |
| "hispida pusa" | ``` ^( )hispida pusa( )$ ``` |  pusa          | false    |                        |
| "hispida pusa  |                              |                | false    | expected 2 " but got 1 |

## space

| input         | regexp                                          | testString        | matching | errorMessage |
| ------------- | ----------------------------------------------- | ----------------- | -------- | ------------ |
| pusa hispida  | ``` .*.*( )pusa.*( ) && .*.*( )hispida.*( ) ``` |  pusa hispida     | true     |              |
| pusa hispida  | ``` .*.*( )pusa.*( ) && .*.*( )hispida.*( ) ``` |  pus hispida      | false    |              |
| pusa hispida  | ``` .*.*( )pusa.*( ) && .*.*( )hispida.*( ) ``` |  hispid pusa      | false    |              |
| pusa  hispida | ``` .*.*( )pusa.*( ) && .*.*( )hispida.*( ) ``` |  pusa hispida     | true     |              |
| pusa  hispida | ``` .*.*( )pusa.*( ) && .*.*( )hispida.*( ) ``` |  pus hispida      | false    |              |
| pusa  hispida | ``` .*.*( )pusa.*( ) && .*.*( )hispida.*( ) ``` |  hispid pusa      | false    |              |
| hispida pusa  | ``` .*.*( )hispida.*( ) && .*.*( )pusa.*( ) ``` |  pusa hispida     | true     |              |
| hispida pusa  | ``` .*.*( )hispida.*( ) && .*.*( )pusa.*( ) ``` |  pus hispida      | false    |              |
| hispida pusa  | ``` .*.*( )hispida.*( ) && .*.*( )pusa.*( ) ``` |  hispid pusa      | false    |              |
| hispida       | ``` .*( )hispida.*( ) ```                       |  pusa hispida     | true     |              |
| hispida       | ``` .*( )hispida.*( ) ```                       |  hispid pusa      | false    |              |
| mu mus        | ``` .*.*( )mu.*( ) && .*.*( )mus.*( ) ```       |  mustelidae       | true     |              |
| mu mus        | ``` .*.*( )mu.*( ) && .*.*( )mus.*( ) ```       |  mus              | true     |              |
| mu mus        | ``` .*.*( )mu.*( ) && .*.*( )mus.*( ) ```       |  mustela          | true     |              |
| mu mus        | ``` .*.*( )mu.*( ) && .*.*( )mus.*( ) ```       |  mus musculoides  | true     |              |
| mu mus        | ``` .*.*( )mu.*( ) && .*.*( )mus.*( ) ```       |  mustela erminea  | true     |              |