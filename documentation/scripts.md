# Scripts

1. [build:changelog](#build:changelog)
2. [build:common:js](#build:common:js)
3. [build:common:schema:api](#build:common:schema:api)
4. [build:common:schema:models](#build:common:schema:models)
5. [build:data:zip](#build:data:zip)
6. [build:index:specimen](#build:index:specimen)
7. [build:semantic-ui](#build:semantic-ui)
8. [build:trees:backend](#build:trees:backend)
9. [build:trees:common](#build:trees:common)
10. [build:trees:ui](#build:trees:ui)
11. [build:trees](#build:trees)
12. [build:ui](#build:ui)
13. [exec:local](#exec:local)

<a name="build:changelog" />

## build:changelog

Build changelog

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