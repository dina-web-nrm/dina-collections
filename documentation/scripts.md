# Scripts

## build
* [build:docs](#build:docs)
* [build:changelog](#build:changelog)
* [build:common:js](#build:common:js)
* [build:common:schema:api](#build:common:schema:api)
* [build:common:schema:models](#build:common:schema:models)
* [build:data:zip](#build:data:zip)
* [build:index:specimen](#build:index:specimen)
* [build:semantic-ui](#build:semantic-ui)
* [build:trees:backend](#build:trees:backend)
* [build:trees:common](#build:trees:common)
* [build:trees:ui](#build:trees:ui)
* [build:trees](#build:trees)
* [build:ui](#build:ui)

## test
* [test:all](#test:all)
* [test:backend:integration](#test:backend:integration)
* [test:backend:unit](#test:backend:unit)
* [test:common:schema-locked](#test:common:schema-locked)
* [test:common](#test:common)
* [test:schema](#test:schema)
* [test:ui](#test:ui)
* [test](#test)

## utilities
* [exec:local](#exec:local)
* [exec:production](#exec:production)
* [exec:stage](#exec:stage)
* [exec:test](#exec:test)

## data
* [export:data:sql](#export:data:sql)
* [import:data:json](#import:data:json)
* [import:data:sample](#import:data:sample)
* [import:data:sql](#import:data:sql)
* [import:data:zip](#import:data:zip)
* [migrate:latest](#migrate:latest)
* [migrate:one](#migrate:one)
* [migrate:undo:one](#migrate:undo:one)

## setup
* [install:backend](#install:backend)
* [install:common](#install:common)
* [install:migrations](#install:migrations)
* [install:schema](#install:schema)
* [install:scripts](#install:scripts)
* [install:semantic-ui](#install:semantic-ui)
* [install:ui](#install:ui)
* [install](#install)
* [setup:env](#setup:env)
* [setup:links:backend](#setup:links:backend)
* [setup:links:common](#setup:links:common)
* [setup:links:migrations](#setup:links:migrations)
* [setup:links:scripts](#setup:links:scripts)
* [setup:links:ui](#setup:links:ui)
* [setup:links](#setup:links)
* [setup:sample-data](#setup:sample-data)
* [setup](#setup)
* [uninstall:backend](#uninstall:backend)
* [uninstall:common](#uninstall:common)
* [uninstall:migrations](#uninstall:migrations)
* [uninstall:schema](#uninstall:schema)
* [uninstall:scripts](#uninstall:scripts)
* [uninstall:semantic-ui](#uninstall:semantic-ui)
* [uninstall:ui](#uninstall:ui)
* [uninstall](#uninstall)

## release
* [postversion](#postversion)
* [preversion](#preversion)
* [version](#version)

## local-services
* [start:backend](#start:backend)
* [start:dbs](#start:dbs)
* [start:elasticsearch](#start:elasticsearch)
* [start:kibana](#start:kibana)
* [start:keycloak](#start:keycloak)
* [start:mysql](#start:mysql)
* [start:postgres](#start:postgres)
* [start:ui](#start:ui)

## remote-services
* [remote:build:data:zip](#remote:build:data:zip)
* [remote:build:index:specimen](#remote:build:index:specimen)
* [remote:deploy](#remote:deploy)
* [remote:download:data:zip](#remote:download:data:zip)
* [remote:download:data:sql](#remote:download:data:sql)
* [remote:exec:cmd](#remote:exec:cmd)
* [remote:exec:script](#remote:exec:script)
* [remote:export:data:sql](#remote:export:data:sql)
* [remote:git:checkout-tag](#remote:git:checkout-tag)
* [remote:import:data:json](#remote:import:data:json)
* [remote:import:data:sample](#remote:import:data:sample)
* [remote:import:data:sql](#remote:import:data:sql)
* [remote:import:data:zip](#remote:import:data:zip)
* [remote:migrate:latest](#remote:migrate:latest)
* [remote:migrate:one](#remote:migrate:one)
* [remote:migrate:undo:one](#remote:migrate:undo:one)
* [remote:print:server-status](#remote:print:server-status)
* [remote:unpack:zip](#remote:unpack:zip)
* [remote:upload:data:zip](#remote:upload:data:zip)

## other
* [docs](#docs)
* [docs:ls](#docs:ls)

## build
<a name="build:docs" />

### build:docs

Build script markdown documentation

```yarn build:docs```

#### Description 
 Will build markdown documentation based on ./scriptDocs/index.json
<a name="build:changelog" />

### build:changelog

Build changelog

#### Description 
 Will build a changelog
<a name="build:common:js" />

### build:common:js

Build common js
<a name="build:common:schema:api" />

### build:common:schema:api

Build schema api
<a name="build:common:schema:models" />

### build:common:schema:models

Build schema models
<a name="build:data:zip" />

### build:data:zip

Exec a local script
<a name="build:index:specimen" />

### build:index:specimen

Exec a local script
<a name="build:semantic-ui" />

### build:semantic-ui

Exec a local script
<a name="build:trees:backend" />

### build:trees:backend

Exec a local script
<a name="build:trees:common" />

### build:trees:common

Exec a local script
<a name="build:trees:ui" />

### build:trees:ui

Exec a local script
<a name="build:trees" />

### build:trees

Exec a local script
<a name="build:ui" />

### build:ui

Exec a local script
## test
<a name="test:all" />

### test:all

```yarn test:all```
<a name="test:backend:integration" />

### test:backend:integration

```yarn test:backend:integration```
<a name="test:backend:unit" />

### test:backend:unit

```yarn test:backend:unit```
<a name="test:common:schema-locked" />

### test:common:schema-locked

```yarn test:common:schema-locked```
<a name="test:common" />

### test:common

```yarn test:common```
<a name="test:schema" />

### test:schema

```yarn test:schema```
<a name="test:ui" />

### test:ui

```yarn test:ui```
<a name="test" />

### test

```yarn test```
## utilities
<a name="exec:local" />

### exec:local

Exec a local script

```yarn exec:local [scriptName] ...```

#### Description 
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

### exec:production

```yarn exec:production```
<a name="exec:stage" />

### exec:stage

```yarn exec:stage```
<a name="exec:test" />

### exec:test

```yarn exec:test```
## data
<a name="export:data:sql" />

### export:data:sql

```yarn export:data:sql```
<a name="import:data:json" />

### import:data:json

```yarn import:data:json```
<a name="import:data:sample" />

### import:data:sample

```yarn import:data:sample```
<a name="import:data:sql" />

### import:data:sql

```yarn import:data:sql```
<a name="import:data:zip" />

### import:data:zip

```yarn import:data:zip```
<a name="migrate:latest" />

### migrate:latest

```yarn migrate:latest```
<a name="migrate:one" />

### migrate:one

```yarn migrate:one```
<a name="migrate:undo:one" />

### migrate:undo:one

```yarn migrate:undo:one```
## setup
<a name="install:backend" />

### install:backend

```yarn install:backend```
<a name="install:common" />

### install:common

```yarn install:common```
<a name="install:migrations" />

### install:migrations

```yarn install:migrations```
<a name="install:schema" />

### install:schema

```yarn install:schema```
<a name="install:scripts" />

### install:scripts

```yarn install:scripts```
<a name="install:semantic-ui" />

### install:semantic-ui

```yarn install:semantic-ui```
<a name="install:ui" />

### install:ui

```yarn install:ui```
<a name="install" />

### install

```yarn install```
<a name="setup:env" />

### setup:env

```yarn setup:env```
<a name="setup:links:backend" />

### setup:links:backend

```yarn setup:links:backend```
<a name="setup:links:common" />

### setup:links:common

```yarn setup:links:common```
<a name="setup:links:migrations" />

### setup:links:migrations

```yarn setup:links:migrations```
<a name="setup:links:scripts" />

### setup:links:scripts

```yarn setup:links:scripts```
<a name="setup:links:ui" />

### setup:links:ui

```yarn setup:links:ui```
<a name="setup:links" />

### setup:links

```yarn setup:links```
<a name="setup:sample-data" />

### setup:sample-data

```yarn setup:sample-data```
<a name="setup" />

### setup

```yarn setup```
<a name="uninstall:backend" />

### uninstall:backend

```yarn uninstall:backend```
<a name="uninstall:common" />

### uninstall:common

```yarn uninstall:common```
<a name="uninstall:migrations" />

### uninstall:migrations

```yarn uninstall:migrations```
<a name="uninstall:schema" />

### uninstall:schema

```yarn uninstall:schema```
<a name="uninstall:scripts" />

### uninstall:scripts

```yarn uninstall:scripts```
<a name="uninstall:semantic-ui" />

### uninstall:semantic-ui

```yarn uninstall:semantic-ui```
<a name="uninstall:ui" />

### uninstall:ui

```yarn uninstall:ui```
<a name="uninstall" />

### uninstall

```yarn uninstall```
## release
<a name="postversion" />

### postversion

```yarn postversion```
<a name="preversion" />

### preversion

```yarn preversion```
<a name="version" />

### version

```yarn version```
## local-services
<a name="start:backend" />

### start:backend

```yarn start:backend```
<a name="start:dbs" />

### start:dbs

```yarn start:dbs```
<a name="start:elasticsearch" />

### start:elasticsearch

```yarn start:elasticsearch```
<a name="start:kibana" />

### start:kibana

```yarn start:kibana```
<a name="start:keycloak" />

### start:keycloak

```yarn start:keycloak```
<a name="start:mysql" />

### start:mysql

```yarn start:mysql```
<a name="start:postgres" />

### start:postgres

```yarn start:postgres```
<a name="start:ui" />

### start:ui

```yarn start:ui```
## remote-services
<a name="remote:build:data:zip" />

### remote:build:data:zip

```yarn remote:build:data:zip```
<a name="remote:build:index:specimen" />

### remote:build:index:specimen

```yarn remote:build:index:specimen```
<a name="remote:deploy" />

### remote:deploy

```yarn remote:deploy```
<a name="remote:download:data:zip" />

### remote:download:data:zip

```yarn remote:download:data:zip```
<a name="remote:download:data:sql" />

### remote:download:data:sql

```yarn remote:download:data:sql```
<a name="remote:exec:cmd" />

### remote:exec:cmd

```yarn remote:exec:cmd```
<a name="remote:exec:script" />

### remote:exec:script

```yarn remote:exec:script```
<a name="remote:export:data:sql" />

### remote:export:data:sql

```yarn remote:export:data:sql```
<a name="remote:git:checkout-tag" />

### remote:git:checkout-tag

```yarn remote:git:checkout-tag```
<a name="remote:import:data:json" />

### remote:import:data:json

```yarn remote:import:data:json```
<a name="remote:import:data:sample" />

### remote:import:data:sample

```yarn remote:import:data:sample```
<a name="remote:import:data:sql" />

### remote:import:data:sql

```yarn remote:import:data:sql```
<a name="remote:import:data:zip" />

### remote:import:data:zip

```yarn remote:import:data:zip```
<a name="remote:migrate:latest" />

### remote:migrate:latest

```yarn remote:migrate:latest```
<a name="remote:migrate:one" />

### remote:migrate:one

```yarn remote:migrate:one```
<a name="remote:migrate:undo:one" />

### remote:migrate:undo:one

```yarn remote:migrate:undo:one```
<a name="remote:print:server-status" />

### remote:print:server-status

```yarn remote:print:server-status```
<a name="remote:unpack:zip" />

### remote:unpack:zip

```yarn remote:unpack:zip```
<a name="remote:upload:data:zip" />

### remote:upload:data:zip

```yarn remote:upload:data:zip```
## other
<a name="docs" />

### docs

Show script docs

```yarn docs [scriptName]```

#### Description 
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

### docs:ls

Show script overview

```yarn docs:ls```

#### Description 
 Use to list all scripts