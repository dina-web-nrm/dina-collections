# Scripts

1. build
  1. [build:docs](#build:docs)
  2. [build:changelog](#build:changelog)
  3. [build:common:js](#build:common:js)
  4. [build:common:schema:api](#build:common:schema:api)
  5. [build:common:schema:models](#build:common:schema:models)
  6. [build:data:zip](#build:data:zip)
  7. [build:index:specimen](#build:index:specimen)
  8. [build:semantic-ui](#build:semantic-ui)
  9. [build:trees:backend](#build:trees:backend)
  10. [build:trees:common](#build:trees:common)
  11. [build:trees:ui](#build:trees:ui)
  12. [build:trees](#build:trees)
  13. [build:ui](#build:ui)
2. test
  1. [test:all](#test:all)
  2. [test:backend:integration](#test:backend:integration)
  3. [test:backend:unit](#test:backend:unit)
  4. [test:common:schema-locked](#test:common:schema-locked)
  5. [test:common](#test:common)
  6. [test:schema](#test:schema)
  7. [test:ui](#test:ui)
  8. [test](#test)
3. utilities
  1. [exec:local](#exec:local)
  2. [exec:production](#exec:production)
  3. [exec:stage](#exec:stage)
  4. [exec:test](#exec:test)
4. data
  1. [export:data:sql](#export:data:sql)
  2. [import:data:json](#import:data:json)
  3. [import:data:sample](#import:data:sample)
  4. [import:data:sql](#import:data:sql)
  5. [import:data:zip](#import:data:zip)
  6. [migrate:latest](#migrate:latest)
  7. [migrate:one](#migrate:one)
  8. [migrate:undo:one](#migrate:undo:one)
5. setup
  1. [install:backend](#install:backend)
  2. [install:common](#install:common)
  3. [install:migrations](#install:migrations)
  4. [install:schema](#install:schema)
  5. [install:scripts](#install:scripts)
  6. [install:semantic-ui](#install:semantic-ui)
  7. [install:ui](#install:ui)
  8. [install](#install)
  9. [setup:env](#setup:env)
  10. [setup:links:backend](#setup:links:backend)
  11. [setup:links:common](#setup:links:common)
  12. [setup:links:migrations](#setup:links:migrations)
  13. [setup:links:scripts](#setup:links:scripts)
  14. [setup:links:ui](#setup:links:ui)
  15. [setup:links](#setup:links)
  16. [setup:sample-data](#setup:sample-data)
  17. [setup](#setup)
  18. [uninstall:backend](#uninstall:backend)
  19. [uninstall:common](#uninstall:common)
  20. [uninstall:migrations](#uninstall:migrations)
  21. [uninstall:schema](#uninstall:schema)
  22. [uninstall:scripts](#uninstall:scripts)
  23. [uninstall:semantic-ui](#uninstall:semantic-ui)
  24. [uninstall:ui](#uninstall:ui)
  25. [uninstall](#uninstall)
6. release
  1. [postversion](#postversion)
  2. [preversion](#preversion)
  3. [version](#version)
7. local-services
  1. [start:backend](#start:backend)
  2. [start:dbs](#start:dbs)
  3. [start:elasticsearch](#start:elasticsearch)
  4. [start:kibana](#start:kibana)
  5. [start:keycloak](#start:keycloak)
  6. [start:mysql](#start:mysql)
  7. [start:postgres](#start:postgres)
  8. [start:ui](#start:ui)
8. remote-services
  1. [remote:build:data:zip](#remote:build:data:zip)
  2. [remote:build:index:specimen](#remote:build:index:specimen)
  3. [remote:deploy](#remote:deploy)
  4. [remote:download:data:zip](#remote:download:data:zip)
  5. [remote:download:data:sql](#remote:download:data:sql)
  6. [remote:exec:cmd](#remote:exec:cmd)
  7. [remote:exec:script](#remote:exec:script)
  8. [remote:export:data:sql](#remote:export:data:sql)
  9. [remote:git:checkout-tag](#remote:git:checkout-tag)
  10. [remote:import:data:json](#remote:import:data:json)
  11. [remote:import:data:sample](#remote:import:data:sample)
  12. [remote:import:data:sql](#remote:import:data:sql)
  13. [remote:import:data:zip](#remote:import:data:zip)
  14. [remote:migrate:latest](#remote:migrate:latest)
  15. [remote:migrate:one](#remote:migrate:one)
  16. [remote:migrate:undo:one](#remote:migrate:undo:one)
  17. [remote:print:server-status](#remote:print:server-status)
  18. [remote:unpack:zip](#remote:unpack:zip)
  19. [remote:upload:data:zip](#remote:upload:data:zip)
9. other
  1. [docs](#docs)
  2. [docs:ls](#docs:ls)

<a name="docs" />

## docs

Show script docs

```yarn docs [scriptName]```

### Description 
 Use to read script documentation

### Args
Flag | Description
--------- | ---------
[scriptName] | Name of script

### Examples
Example | Description
--------- | ---------
yarn docs build:changelog | Will display documentation for script build:changelog

<a name="docs:ls" />

## docs:ls

Show script overview

```yarn docs:ls```

### Description 
 Use to list all scripts

<a name="build:docs" />

## build:docs

Build script markdown documentation

```yarn build:docs```

### Description 
 Will build markdown documentation based on ./scriptDocs/index.json

<a name="build:changelog" />

## build:changelog

Build changelog

### Description 
 Will build a changelog

<a name="build:common:js" />

## build:common:js

Build common js

<a name="build:common:schema:api" />

## build:common:schema:api

Build schema api

<a name="build:common:schema:models" />

## build:common:schema:models

Build schema models

<a name="build:data:zip" />

## build:data:zip

Exec a local script

<a name="build:index:specimen" />

## build:index:specimen

Exec a local script

<a name="build:semantic-ui" />

## build:semantic-ui

Exec a local script

<a name="build:trees:backend" />

## build:trees:backend

Exec a local script

<a name="build:trees:common" />

## build:trees:common

Exec a local script

<a name="build:trees:ui" />

## build:trees:ui

Exec a local script

<a name="build:trees" />

## build:trees

Exec a local script

<a name="build:ui" />

## build:ui

Exec a local script

<a name="exec:local" />

## exec:local

Exec a local script

```yarn exec:local [scriptName] ...```

### Description 
 Will execute a local bash script located in ./packages/scripts/src/bash. Arguments will be forwarded to script

### Args
Flag | Description
--------- | ---------
[scriptName] | Name of script
... | Rest will be forwarded to script

### Examples
Example | Description
--------- | ---------
yarn exec:local rm-data.sh | Will run the rm-data.sh script

<a name="exec:production" />

## exec:production

```yarn exec:production```

<a name="exec:stage" />

## exec:stage

```yarn exec:stage```

<a name="exec:test" />

## exec:test

```yarn exec:test```

<a name="export:data:sql" />

## export:data:sql

```yarn export:data:sql```

<a name="import:data:json" />

## import:data:json

```yarn import:data:json```

<a name="import:data:sample" />

## import:data:sample

```yarn import:data:sample```

<a name="import:data:sql" />

## import:data:sql

```yarn import:data:sql```

<a name="import:data:zip" />

## import:data:zip

```yarn import:data:zip```

<a name="install:backend" />

## install:backend

```yarn install:backend```

<a name="install:common" />

## install:common

```yarn install:common```

<a name="install:migrations" />

## install:migrations

```yarn install:migrations```

<a name="install:schema" />

## install:schema

```yarn install:schema```

<a name="install:scripts" />

## install:scripts

```yarn install:scripts```

<a name="install:semantic-ui" />

## install:semantic-ui

```yarn install:semantic-ui```

<a name="install:ui" />

## install:ui

```yarn install:ui```

<a name="install" />

## install

```yarn install```

<a name="migrate:latest" />

## migrate:latest

```yarn migrate:latest```

<a name="migrate:one" />

## migrate:one

```yarn migrate:one```

<a name="migrate:undo:one" />

## migrate:undo:one

```yarn migrate:undo:one```

<a name="postversion" />

## postversion

```yarn postversion```

<a name="preversion" />

## preversion

```yarn preversion```

<a name="remote:build:data:zip" />

## remote:build:data:zip

```yarn remote:build:data:zip```

<a name="remote:build:index:specimen" />

## remote:build:index:specimen

```yarn remote:build:index:specimen```

<a name="remote:deploy" />

## remote:deploy

```yarn remote:deploy```

<a name="remote:download:data:zip" />

## remote:download:data:zip

```yarn remote:download:data:zip```

<a name="remote:download:data:sql" />

## remote:download:data:sql

```yarn remote:download:data:sql```

<a name="remote:exec:cmd" />

## remote:exec:cmd

```yarn remote:exec:cmd```

<a name="remote:exec:script" />

## remote:exec:script

```yarn remote:exec:script```

<a name="remote:export:data:sql" />

## remote:export:data:sql

```yarn remote:export:data:sql```

<a name="remote:git:checkout-tag" />

## remote:git:checkout-tag

```yarn remote:git:checkout-tag```

<a name="remote:import:data:json" />

## remote:import:data:json

```yarn remote:import:data:json```

<a name="remote:import:data:sample" />

## remote:import:data:sample

```yarn remote:import:data:sample```

<a name="remote:import:data:sql" />

## remote:import:data:sql

```yarn remote:import:data:sql```

<a name="remote:import:data:zip" />

## remote:import:data:zip

```yarn remote:import:data:zip```

<a name="remote:migrate:latest" />

## remote:migrate:latest

```yarn remote:migrate:latest```

<a name="remote:migrate:one" />

## remote:migrate:one

```yarn remote:migrate:one```

<a name="remote:migrate:undo:one" />

## remote:migrate:undo:one

```yarn remote:migrate:undo:one```

<a name="remote:print:server-status" />

## remote:print:server-status

```yarn remote:print:server-status```

<a name="remote:unpack:zip" />

## remote:unpack:zip

```yarn remote:unpack:zip```

<a name="remote:upload:data:zip" />

## remote:upload:data:zip

```yarn remote:upload:data:zip```

<a name="setup:env" />

## setup:env

```yarn setup:env```

<a name="setup:links:backend" />

## setup:links:backend

```yarn setup:links:backend```

<a name="setup:links:common" />

## setup:links:common

```yarn setup:links:common```

<a name="setup:links:migrations" />

## setup:links:migrations

```yarn setup:links:migrations```

<a name="setup:links:scripts" />

## setup:links:scripts

```yarn setup:links:scripts```

<a name="setup:links:ui" />

## setup:links:ui

```yarn setup:links:ui```

<a name="setup:links" />

## setup:links

```yarn setup:links```

<a name="setup:sample-data" />

## setup:sample-data

```yarn setup:sample-data```

<a name="setup" />

## setup

```yarn setup```

<a name="start:backend" />

## start:backend

```yarn start:backend```

<a name="start:dbs" />

## start:dbs

```yarn start:dbs```

<a name="start:elasticsearch" />

## start:elasticsearch

```yarn start:elasticsearch```

<a name="start:kibana" />

## start:kibana

```yarn start:kibana```

<a name="start:keycloak" />

## start:keycloak

```yarn start:keycloak```

<a name="start:mysql" />

## start:mysql

```yarn start:mysql```

<a name="start:postgres" />

## start:postgres

```yarn start:postgres```

<a name="start:ui" />

## start:ui

```yarn start:ui```

<a name="test:all" />

## test:all

```yarn test:all```

<a name="test:backend:integration" />

## test:backend:integration

```yarn test:backend:integration```

<a name="test:backend:unit" />

## test:backend:unit

```yarn test:backend:unit```

<a name="test:common:schema-locked" />

## test:common:schema-locked

```yarn test:common:schema-locked```

<a name="test:common" />

## test:common

```yarn test:common```

<a name="test:schema" />

## test:schema

```yarn test:schema```

<a name="test:ui" />

## test:ui

```yarn test:ui```

<a name="test" />

## test

```yarn test```

<a name="uninstall:backend" />

## uninstall:backend

```yarn uninstall:backend```

<a name="uninstall:common" />

## uninstall:common

```yarn uninstall:common```

<a name="uninstall:migrations" />

## uninstall:migrations

```yarn uninstall:migrations```

<a name="uninstall:schema" />

## uninstall:schema

```yarn uninstall:schema```

<a name="uninstall:scripts" />

## uninstall:scripts

```yarn uninstall:scripts```

<a name="uninstall:semantic-ui" />

## uninstall:semantic-ui

```yarn uninstall:semantic-ui```

<a name="uninstall:ui" />

## uninstall:ui

```yarn uninstall:ui```

<a name="uninstall" />

## uninstall

```yarn uninstall```

<a name="version" />

## version

```yarn version```