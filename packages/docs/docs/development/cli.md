---
id: cli
title: Command Line Interfce
sidebar_label: CLI
---

<!--- Note! This is generated from cli.js so edits directly in the cli.md will be overwritten. -->

This is a documentation of the scripts avaialble from the root level. All these
scripts are defined in root package.json and in general the scripts defined in
package.json either call a script provided by a dependency or one or more
scripts from the script package. This script definition is available in the
documentation for each script and to get more detailed information about how a
script works inspect the src

## TOC

**setup**

- [install:backend](#install-backend)
- [install:common](#install-common)
- [install:docs](#install-docs)
- [install:migrations](#install-migrations)
- [install:schema](#install-schema)
- [install:scripts](#install-scripts)
- [install:semantic-ui](#install-semantic-ui)
- [install:ui](#install-ui)
- [install](#install)
- [setup](#setup)
- [setup:dev](#setup-dev)
- [setup:env](#setup-env)
- [setup:env:ci:docker](#setup-env-ci-docker)
- [setup:env:ci:local](#setup-env-ci-local)
- [setup:env:dev](#setup-env-dev)
- [setup:links](#setup-links)
- [setup:links:backend](#setup-links-backend)
- [setup:links:common](#setup-links-common)
- [setup:links:migrations](#setup-links-migrations)
- [setup:links:scripts](#setup-links-scripts)
- [setup:links:ui](#setup-links-ui)
- [setup:sample-data](#setup-sample-data)
- [uninstall](#uninstall)
- [uninstall:backend](#uninstall-backend)
- [uninstall:common](#uninstall-common)
- [uninstall:docs](#uninstall-docs)
- [uninstall:migrations](#uninstall-migrations)
- [uninstall:schema](#uninstall-schema)
- [uninstall:scripts](#uninstall-scripts)
- [uninstall:semantic-ui](#uninstall-semantic-ui)
- [uninstall:ui](#uninstall-ui)

**data**

- [build:data:zip](#build-data-zip)
- [export:data:sample:sql](#export-data-sample-sql)
- [export:data:sql](#export-data-sql)
- [export:elastic-indices:json](#export-elastic-indices-json)
- [export:elastic-indices:sample](#export-elastic-indices-sample)
- [import:data:json](#import-data-json)
- [import:data:sample](#import-data-sample)
- [import:data:sql](#import-data-sql)
- [import:data:zip](#import-data-zip)
- [import:elastic-indices:json](#import-elastic-indices-json)
- [import:elastic-indices:sample](#import-elastic-indices-sample)
- [migrate:latest](#migrate-latest)
- [migrate:one](#migrate-one)
- [migrate:undo:one](#migrate-undo-one)

**test**

- [test](#test)
- [test:all](#test-all)
- [test:backend:integration](#test-backend-integration)
- [test:backend:unit](#test-backend-unit)
- [test:common](#test-common)
- [test:common:schema-locked](#test-common-schema-locked)
- [test:e2e](#test-e2e)
- [test:models](#test-models)
- [test:ui](#test-ui)

**local-services**

- [start:backend](#start-backend)
- [start:dbs](#start-dbs)
- [start:docs](#start-docs)
- [start:elasticsearch](#start-elasticsearch)
- [start:keycloak](#start-keycloak)
- [start:kibana](#start-kibana)
- [start:mysql](#start-mysql)
- [start:postgres](#start-postgres)
- [start:ui](#start-ui)

**build**

- [build](#build)
- [build:changelog](#build-changelog)
- [build:common:schema:api](#build-common-schema-api)
- [build:common:schema:models](#build-common-schema-models)
- [build:docker:backend](#build-docker-backend)
- [build:docker:migrations](#build-docker-migrations)
- [build:docker:style](#build-docker-style)
- [build:docker:ui](#build-docker-ui)
- [build:docs](#build-docs)
- [build:index-specimen:json](#build-index-specimen-json)
- [build:markdown](#build-markdown)
- [build:markdown:cli](#build-markdown-cli)
- [build:semantic-ui](#build-semantic-ui)
- [build:trees](#build-trees)
- [build:trees:backend](#build-trees-backend)
- [build:trees:common](#build-trees-common)
- [build:trees:ui](#build-trees-ui)
- [build:ui](#build-ui)

**release**

- [postversion](#postversion)
- [preversion](#preversion)
- [version](#version)
- [version:minor](#version-minor)
- [version:patch](#version-patch)
- [version:rc](#version-rc)
- [version:release](#version-release)
- [version:test](#version-test)

**remote-services**

- [remote:build:elastic-indices](#remote-build-elastic-indices)
- [remote:deploy](#remote-deploy)
- [remote:download:data:zip](#remote-download-data-zip)
- [remote:download:data:sql](#remote-download-data-sql)
- [remote:exec:cmd](#remote-exec-cmd)
- [remote:exec:script](#remote-exec-script)
- [remote:export:data:sql](#remote-export-data-sql)
- [remote:git:checkout-tag](#remote-git-checkout-tag)
- [remote:import:data:json](#remote-import-data-json)
- [remote:import:data:sample](#remote-import-data-sample)
- [remote:import:data:sql](#remote-import-data-sql)
- [remote:import:data:zip](#remote-import-data-zip)
- [remote:log](#remote-log)
- [remote:migrate:latest](#remote-migrate-latest)
- [remote:migrate:one](#remote-migrate-one)
- [remote:migrate:undo:one](#remote-migrate-undo-one)
- [remote:print:server-status](#remote-print-server-status)
- [remote:unpack:zip](#remote-unpack-zip)
- [remote:upload:data:zip](#remote-upload-data-zip)

**utilities**

- [build:version-info](#build-version-info)
- [delete-test-tags](#delete-test-tags)
- [cli:docs](#cli-docs)
- [exec:local](#exec-local)
- [exec:production](#exec-production)
- [exec:stage](#exec-stage)
- [exec:test](#exec-test)
- [lock-schema](#lock-schema)
- [pretty](#pretty)
- [pretty:backend](#pretty-backend)
- [pretty:common](#pretty-common)
- [pretty:migrations](#pretty-migrations)
- [pretty:schema](#pretty-schema)
- [pretty:scripts](#pretty-scripts)
- [pretty:ui](#pretty-ui)

**other**

## setup scripts

Scripts for setting up the system including installing the different packages
and setting up env variables <a name="install-backend" />

### install:backend

Installbackend package

`yarn install:backend`

#### Description

See [install](#install)

#### src

```bash
cd ./packages/backend && yarn install
```

<a name="install-common" />

### install:common

Install common package

`yarn install:common`

#### Description

See [install](#install)

#### src

```bash
cd ./packages/common && yarn install
```

<a name="install-docs" />

### install:docs

Install docs package

`yarn install:docs`

#### Description

See [install](#install)

#### src

```bash
cd ./packages/docs && yarn install
```

<a name="install-migrations" />

### install:migrations

Install migrations package

`yarn install:migrations`

#### Description

See [install](#install)

#### src

```bash
cd ./packages/migrations && yarn install
```

<a name="install-schema" />

### install:schema

Install schema (models) package

`yarn install:schema`

#### Description

See [install](#install)

#### src

```bash
cd ./packages/models && yarn install
```

<a name="install-scripts" />

### install:scripts

Install script package

`yarn install:scripts`

#### Description

See [install](#install)

#### src

```bash
cd ./packages/scripts && yarn install
```

<a name="install-semantic-ui" />

### install:semantic-ui

Install style package

`yarn install:semantic-ui`

#### Description

See [install](#install)

#### src

```bash
cd ./packages/style && yarn install
```

<a name="install-ui" />

### install:ui

Install ui package

`yarn install:ui`

#### Description

See [install](#install)

#### src

```bash
cd ./packages/ui && yarn install
```

<a name="install" />

### install

Install all packages

`yarn install`

#### Description

Will call all package specific install scripts. These scripts will enter their
package and run [yarn install](https://yarnpkg.com/lang/en/docs/cli/install/)

#### src

```bash
yarn install:schema && yarn install:semantic-ui && yarn install:ui && yarn install:backend && yarn install:common && yarn install:scripts && yarn install:migrations && yarn install:docs
```

<a name="setup" />

### setup

Run to get started for running with docker

`yarn setup`

#### Description

Will run scripts multiple scripts to setup environment variables, sample data,
install node modules, link packages and run tests. Similar to
[setup:dev](#setup:dev) with the difference that this script calls the script to
setup environment variables for running the application fully in docker. For
more information see [setup locally](../setup/setup-locally-for-development) and
[setup for docker](../setup/setup-locally-with-docker)

#### src

```bash
yarn setup:env && yarn setup:sample-data && yarn install && yarn setup:links && yarn test
```

<a name="setup-dev" />

### setup:dev

Run to get started for development

`yarn setup:dev`

#### Description

Will run scripts multiple scripts to setup environment variables, sample data,
install node modules, link packages and run tests. Similar to [setup](#setup)
but setups the application to run ui and api outside docker. Recommended setup
for development

#### src

```bash
yarn setup:env:dev && yarn setup:sample-data && yarn install && yarn setup:links && yarn test
```

<a name="setup-env" />

### setup:env

Setup env files for from sample env files

`yarn setup:env`

#### Description

Setup env files ./env from ./env/sample. The files suffixed with .dev will not
be used

#### src

```bash
./packages/scripts/src/bash/create-env.sh
```

<a name="setup-env-ci-docker" />

### setup:env:ci:docker

Setup env files for ci when using docker

`yarn setup:env:ci:docker`

#### Description

Setup env files ./env from ./env/ci. Used by the ci when running tests that
depends on docker

#### src

```bash
./packages/scripts/src/bash/create-env-ci-docker.sh
```

<a name="setup-env-ci-local" />

### setup:env:ci:local

Setup env files for ci when not using docker

`yarn setup:env:ci:local`

#### Description

Setup env files ./env from ./env/ci. Used by the ci when running tests that runs
outside docker

#### src

```bash
./packages/scripts/src/bash/create-env-ci-local.sh
```

<a name="setup-env-dev" />

### setup:env:dev

Setup env files for development

`yarn setup:env:dev`

#### Description

Setup env files ./env from ./env/sample. If a sample file is suffixed with .dev
it will be used instead of the file not suffixed with dev

#### src

```bash
./packages/scripts/src/bash/create-env-development.sh
```

<a name="setup-links" />

### setup:links

Run all other setup link scripts

`yarn setup:links`

#### src

```bash
yarn setup:links:common && yarn setup:links:backend && yarn setup:links:ui && yarn setup:links:scripts && yarn setup:links:migrations
```

<a name="setup-links-backend" />

### setup:links:backend

Setup npm links for backend package

`yarn setup:links:backend`

#### src

```bash
cd ./packages/backend && yarn link && yarn link common
```

<a name="setup-links-common" />

### setup:links:common

Setup npm links for common package

`yarn setup:links:common`

#### src

```bash
cd ./packages/common && yarn link
```

<a name="setup-links-migrations" />

### setup:links:migrations

Setup npm links for migrations package

`yarn setup:links:migrations`

#### src

```bash
cd ./packages/migrations && yarn link backend && yarn link common && yarn link scripts
```

<a name="setup-links-scripts" />

### setup:links:scripts

Setup npm links for scripts package

`yarn setup:links:scripts`

#### src

```bash
cd ./packages/scripts && yarn link
```

<a name="setup-links-ui" />

### setup:links:ui

Setup npm links for ui package

`yarn setup:links:ui`

#### src

```bash
cd ./packages/ui && yarn link common
```

<a name="setup-sample-data" />

### setup:sample-data

Will copy sample data files to json files

`yarn setup:sample-data`

#### Description

Will copy sample data files ./data/sample._.json to ./data/._.json

#### src

```bash
yarn exec:local create-sample-data.sh
```

<a name="uninstall" />

### uninstall

Uninstall all node modules from all package

`yarn uninstall`

#### src

```bash
yarn uninstall:backend && yarn uninstall:ui && yarn uninstall:schema && yarn uninstall:semantic-ui && yarn uninstall:common && yarn uninstall:migrations && yarn uninstall:scripts && yarn uninstall:docs
```

<a name="uninstall-backend" />

### uninstall:backend

Uninstall node_modules in backend package

`yarn uninstall:backend`

#### src

```bash
rm -rf ./packages/backend/node_modules
```

<a name="uninstall-common" />

### uninstall:common

Uninstall node_modules in common package

`yarn uninstall:common`

#### src

```bash
rm -rf ./packages/common/node_modules
```

<a name="uninstall-docs" />

### uninstall:docs

Uninstall node_modules in docs package

`yarn uninstall:docs`

#### src

```bash
rm -rf ./packages/docs/node_modules
```

<a name="uninstall-migrations" />

### uninstall:migrations

Uninstall node_modules in migrations package

`yarn uninstall:migrations`

#### src

```bash
rm -rf ./packages/migrations/node_modules
```

<a name="uninstall-schema" />

### uninstall:schema

Uninstall node_modules in models package

`yarn uninstall:schema`

#### src

```bash
rm -rf ./packages/models/node_modules
```

<a name="uninstall-scripts" />

### uninstall:scripts

Uninstall node_modules in script package

`yarn uninstall:scripts`

#### src

```bash
rm -rf ./packages/scripts/node_modules
```

<a name="uninstall-semantic-ui" />

### uninstall:semantic-ui

Uninstall node_modules in style package

`yarn uninstall:semantic-ui`

#### src

```bash
rm -rf ./packages/style/node_modules
```

<a name="uninstall-ui" />

### uninstall:ui

Uninstall node_modules in ui package

`yarn uninstall:ui`

#### src

```bash
rm -rf ./packages/ui/node_modules
```

## data scripts

Scripts to work with data locally <a name="build-data-zip" />

### build:data:zip

Build an exportable data.zip

`yarn build:data:zip`

#### Description

Will create a new exportable data.zip based on the current data files located in
./data. Note that this will replace any existing ./data/data.zip. This generated
file can then be uploaded to any configured server using
[remote:upload:data:zip](#remote-upload-data-zip)

#### src

```bash
node ./packages/scripts/src/js/packageJsonDataFiles.js -s local
```

<a name="export-data-sample-sql" />

### export:data:sample:sql

Export data from sql

`yarn export:data:sample:sql`

#### Description

Will export sample data to to ./data/sample.dump.sql. To be able to do this it
will first import sample from ./data.sample.\*.json. Note that this will first
drop the current database. These operations are done on the dev database. This
sample data will later be used for testing. Note that this should be run after
updating sample data or updating the data model

#### src

```bash
yarn import:data:sample && yarn export:data:sql -f ./data/sample.dump.sql
```

<a name="export-data-sql" />

### export:data:sql

Export data from sql

`yarn export:data:sql`

#### Description

Will export the current sql data to ./data/dump.sql. Unlike
export:data:sample:sql it will not import any data first

#### src

```bash
./packages/scripts/src/bash/docker-dump-db-to-sql.sh -d dina_dev
```

<a name="export-elastic-indices-json" />

### export:elastic-indices:json

Export data from elasticsearch indices

`yarn export:elastic-indices:json`

#### Description

Will export the elastic-indices to .index.\*

#### src

```bash
yarn start:elasticsearch && ./packages/scripts/src/bash/elasticsearch-export-indices.sh
```

<a name="export-elastic-indices-sample" />

### export:elastic-indices:sample

Export data from elasticsearch indices to sample files

`yarn export:elastic-indices:sample`

#### Description

Will export sample elastic-indices to sample.index.\*. First it will create
elastic-sample data by dropping the postgres db, importing sample data into
postgres and creating the elastic indices. Note that this will drop the current
dev database.

#### src

```bash
yarn import:data:sample && sleep 5 && ./packages/scripts/src/bash/elasticsearch-export-indices.sh -f ./data/sample.index
```

<a name="import-data-json" />

### import:data:json

Import json files

`yarn import:data:json`

#### Description

Will import data from json files (./data/\*.json) to postgres and rebuild
elastic indices

#### src

```bash
yarn start:dbs && cd ./packages/migrations && yarn setup:development
```

<a name="import-data-sample" />

### import:data:sample

Import sample json files

`yarn import:data:sample`

#### Description

Will import data from sample json files (./data/sample.\*.json) to postgres and
rebuild elastic indices. When doing this the current json files (not the sample
files) in ./data will be removed

#### src

```bash
yarn start:dbs && yarn exec:local rm-data.sh || true && yarn setup:sample-data && cd ./packages/migrations && yarn setup:development
```

<a name="import-data-sql" />

### import:data:sql

Import data from sql

`yarn import:data:sql`

#### Description

Will import data from sample json files (./data/sample.\*.json) to postgres and
rebuild elastic indices. When doing this the current json files (not the sample
files) in ./data will be removed

#### src

```bash
yarn remote:import:data:sql -s local
```

<a name="import-data-zip" />

### import:data:zip

Import data from zip file

`yarn import:data:zip`

#### Description

Will import data from zip file generated by build:data:zip

#### src

```bash
yarn start:dbs && node ./packages/scripts/src/js/unpackDataFiles.js -s local && cd ./packages/migrations && yarn setup:development
```

<a name="import-elastic-indices-json" />

### import:elastic-indices:json

Import data into elasticsearch

`yarn import:elastic-indices:json`

#### Description

Will import data from files generated by
[export:elastic-indices:json](#export-elastic-indices-json)

#### src

```bash
yarn start:elasticsearch && ./packages/scripts/src/bash/elasticsearch-import-indices.sh
```

<a name="import-elastic-indices-sample" />

### import:elastic-indices:sample

Import data into elasticsearch from sample files

`yarn import:elastic-indices:sample`

#### Description

Will import data from files generated by
[import:elastic-indices:json](#import-elastic-indices-json)

#### src

```bash
yarn start:elasticsearch && ./packages/scripts/src/bash/elasticsearch-import-indices.sh -f ./data/sample.index
```

<a name="migrate-latest" />

### migrate:latest

Migrate postgres db to latest version

`yarn migrate:latest`

#### Description

Will run postgres schema migrations specified in the migrations repository up to
the latest version. Under the hood [sequelize
migrations](http://docs.sequelizejs.com/manual/migrations.html) are used.

#### src

```bash
cd ./packages/migrations && yarn db:development:migrate:latest
```

<a name="migrate-one" />

### migrate:one

Will run one postgres schema migration

`yarn migrate:one`

#### Description

Same as [migrate:latest](#migrate-latest) expect that only one migration is
performed

#### src

```bash
cd ./packages/migrations && yarn db:development:migrate:one
```

<a name="migrate-undo-one" />

### migrate:undo:one

Will undo one postgres schema migration

`yarn migrate:undo:one`

#### Description

Inspect [sequelize
migrations](http://docs.sequelizejs.com/manual/migrations.html) for details

#### src

```bash
cd ./packages/migrations && yarn db:development:migrate:undo:one
```

## test scripts

Scripts for test <a name="test" />

### test

Run all unit tests

`yarn test`

#### src

```bash
yarn setup:env && yarn test:models && yarn test:backend:unit && yarn test:ui && yarn test:common
```

<a name="test-all" />

### test:all

Run all tests

`yarn test:all`

#### src

```bash
yarn test:models && yarn test:backend:unit && yarn test:backend:integration && yarn test:ui && yarn test:common && yarn test:e2e
```

<a name="test-backend-integration" />

### test:backend:integration

Run integration tests in backend package

`yarn test:backend:integration`

#### src

```bash
cd ./packages/backend && yarn test:integration
```

<a name="test-backend-unit" />

### test:backend:unit

Run unit tests in backend package

`yarn test:backend:unit`

#### src

```bash
cd ./packages/backend && yarn test
```

<a name="test-common" />

### test:common

Run tests in common package

`yarn test:common`

#### src

```bash
cd ./packages/common && yarn test
```

<a name="test-common-schema-locked" />

### test:common:schema-locked

Run tests in common package to ensure that the schema is locked

`yarn test:common:schema-locked`

#### src

```bash
cd ./packages/common && yarn test:schema-locked
```

<a name="test-e2e" />

### test:e2e

Run e2e tests in ui package

`yarn test:e2e`

#### src

```bash
cd ./packages/ui && yarn test:e2e
```

<a name="test-models" />

### test:models

Run tests in models package

`yarn test:models`

#### src

```bash
cd ./packages/models && yarn test
```

<a name="test-ui" />

### test:ui

Run tests in ui package

`yarn test:ui`

#### src

```bash
cd ./packages/ui && yarn test:coverage
```

## local-services scripts

Scripts managing local services <a name="start-backend" />

### start:backend

Start backend for development

`yarn start:backend`

#### Description

Will start the backend outside docker

#### src

```bash
yarn start:dbs && cd ./packages/backend && yarn start
```

<a name="start-dbs" />

### start:dbs

Start postgres, mysql and elasticsearch

`yarn start:dbs`

#### src

```bash
yarn start:postgres && yarn start:elasticsearch && yarn start:mysql
```

<a name="start-docs" />

### start:docs

Start docs docker

`yarn start:docs`

#### src

```bash
cd ./packages/docs && yarn start
```

<a name="start-elasticsearch" />

### start:elasticsearch

Start elasticsearch docker

`yarn start:elasticsearch`

#### src

```bash
docker-compose -f docker-compose.yaml up -d elasticsearch
```

<a name="start-keycloak" />

### start:keycloak

Start keycloak docker

`yarn start:keycloak`

#### src

```bash
yarn start:mysql && REALM=-dev docker-compose -f docker-compose.yaml up -d keycloak
```

<a name="start-kibana" />

### start:kibana

Start kibana docker

`yarn start:kibana`

#### src

```bash
docker-compose -f docker-compose.dev-utils.yaml up -d kibana
```

<a name="start-mysql" />

### start:mysql

Start mysql docker

`yarn start:mysql`

#### src

```bash
docker-compose -f docker-compose.yaml up -d mysql
```

<a name="start-postgres" />

### start:postgres

Start postgres docker

`yarn start:postgres`

#### src

```bash
docker-compose -f docker-compose.yaml up -d postgres
```

<a name="start-ui" />

### start:ui

Start ui for development

`yarn start:ui`

#### src

```bash
cd ./packages/ui && yarn start
```

## build scripts

<a name="build" />

### build

Build ui and semantic ui

`yarn build`

#### Description

Internally call build:ui and build:semantic-ui

#### src

```bash
yarn build:ui && yarn build:semantic-ui
```

<a name="build-changelog" />

### build:changelog

Build changelog

`yarn build:changelog`

#### Description

Will create or update ./CHANGELOG.md based on the git merged branch history.
Using [auto-changelog](https://www.npmjs.com/package/auto-changelog) under the
hood.

#### src

```bash
auto-changelog -p --tag-pattern '^((?!rc|test).)*$' --template changelog-template.hbs && git add CHANGELOG.md
```

<a name="build-common-schema-api" />

### build:common:schema:api

Build schema api

`yarn build:common:schema:api`

#### Description

Will build the api schema for the current backend and model version. Read more
about schema generation in the common package

#### src

```bash
cd ./packages/common && yarn build:schema:api
```

<a name="build-common-schema-models" />

### build:common:schema:models

Build schema models

`yarn build:common:schema:models`

#### Description

Will build the models schema for the current model version. Read more about
schema generation in the common package

#### src

```bash
cd ./packages/common && yarn build:schema:models
```

<a name="build-docker-backend" />

### build:docker:backend

Build backend docker

`yarn build:docker:backend`

#### Description

Used by ci to build a docker image for the backend package

#### src

```bash
CI_BUILD_API=true ./packages/scripts/src/bash/ci-build.sh
```

<a name="build-docker-migrations" />

### build:docker:migrations

Build migrations docker

`yarn build:docker:migrations`

#### Description

Used by ci to build a docker image for the migrations package

#### src

```bash
CI_BUILD_MIGRATIONS=true ./packages/scripts/src/bash/ci-build.sh
```

<a name="build-docker-style" />

### build:docker:style

Build style docker

`yarn build:docker:style`

#### Description

Used by ci to build a docker image for the style package

#### src

```bash
CI_BUILD_STYLE=true ./packages/scripts/src/bash/ci-build.sh
```

<a name="build-docker-ui" />

### build:docker:ui

Build ui docker

`yarn build:docker:ui`

#### Description

Used by ci to build a docker image for the ui package

#### src

```bash
CI_BUILD_UI=true ./packages/scripts/src/bash/ci-build.sh
```

<a name="build-docs" />

### build:docs

Build docs package

`yarn build:docs`

#### Description

Will build the static files for the doc package

#### src

```bash
cd ./packages/docs && yarn build
```

<a name="build-index-specimen-json" />

### build:index-specimen:json

Build specimen elasticsearch index

`yarn build:index-specimen:json`

#### Description

Will build the elasticsearch specimen index

#### src

```bash
yarn start:dbs && cd ./packages/migrations && yarn elasticsearch:development:rebuild-index:specimen-search
```

<a name="build-markdown" />

### build:markdown

Build markdown

`yarn build:markdown`

#### Description

Will build markdown files using different scripts. Also interpolate markdown
files.

#### src

```bash
yarn build:trees && cd ./packages/docs && yarn interpolateFiles
```

<a name="build-markdown-cli" />

### build:markdown:cli

Create cli documentation

`yarn build:markdown:cli`

#### Description

Will create this cli documentation

#### src

```bash
cd ./packages/docs && yarn build:markdown:cli
```

<a name="build-semantic-ui" />

### build:semantic-ui

Build docs style package

`yarn build:semantic-ui`

#### Description

Will build the static files for the style package

#### src

```bash
cd ./packages/style && yarn build:docs
```

<a name="build-trees" />

### build:trees

Build tree documentation in backend, common and ui

`yarn build:trees`

#### src

```bash
yarn build:trees:ui && yarn build:trees:common && yarn build:trees:backend
```

<a name="build-trees-backend" />

### build:trees:backend

Build tree documentation in backend

`yarn build:trees:backend`

#### src

```bash
cd ./packages/backend && yarn build:trees
```

<a name="build-trees-common" />

### build:trees:common

Build tree documentation in common

`yarn build:trees:common`

#### src

```bash
cd ./packages/common && yarn build:trees
```

<a name="build-trees-ui" />

### build:trees:ui

Build tree documentation in ui

`yarn build:trees:ui`

#### src

```bash
cd ./packages/ui && yarn build:trees
```

<a name="build-ui" />

### build:ui

Build ui package

`yarn build:ui`

#### Description

This will transpile es6 to es5 and create a production ready dist of the ui. Not
needed in dev mode

#### src

```bash
cd ./packages/ui && yarn build
```

## release scripts

<a name="postversion" />

### postversion

Internal hook activated after running version scripts

`yarn postversion`

#### Description

Inspect src for more details

#### src

```bash
./packages/scripts/src/bash/release-post-version.sh
```

<a name="preversion" />

### preversion

Internal hook activated before running version scripts

`yarn preversion`

#### src

```bash
./packages/scripts/src/bash/release-pre-version.sh
```

<a name="version" />

### version

Internal script. Use version:patch, version:minor, version:rc or version:test
instead

`yarn version`

#### src

```bash
./packages/scripts/src/bash/release-version.sh
```

<a name="version-minor" />

### version:minor

Create a minor release

`yarn version:minor`

#### Description

Will run version:release with version incremented according to semver minor

#### src

```bash
VERSION_TYPE=release yarn version --minor
```

<a name="version-patch" />

### version:patch

Create a patch release

`yarn version:patch`

#### Description

Will run version:release with version incremented according to semver patch

#### src

```bash
VERSION_TYPE=release yarn version --patch
```

<a name="version-rc" />

### version:rc

Release a release candidate

`yarn version:rc`

#### Description

This command will create a release candidate. When run it will prompt the user
for the name of the release candidate. Should be named after the coming release
suffixed with -rc

#### src

```bash
VERSION_TYPE=pre-release yarn version
```

<a name="version-release" />

### version:release

Create a release

`yarn version:release`

#### Description

This command will create a release. When run it will prompt the user for the
name of the release [TODO] add reference to release. This script will then
create a new git tag and push to github. This will trigger travis to run all
tests and if they succeed build docker images and push to docker hub. Later this
version can be deployed using [remote:deploy](#remote:deploy)

#### src

```bash
VERSION_TYPE=release yarn version
```

<a name="version-test" />

### version:test

Create a test release

`yarn version:test`

#### Description

This command will create a test release. When run it will prompt the user for
the name of the test version. Should be current version followed by
-test-[name]-[index] ex 0.19.1-test-anton-1 for the first test version. This
script will then create a new git tag and push to github. This will trigger
travis to run all tests and if they succeed build docker images and push to
docker hub

#### src

```bash
VERSION_TYPE=test-release yarn version
```

## remote-services scripts

These scripts are used to interact with remote servers. The ips and connection
details of these servers are specified in [script env
file](../configuration/env#scripts). Right now its supported with 4 different
server roles: production, stage, test and demo', utilities: 'Different utility
scripts <a name="remote-build-elastic-indices" />

### remote:build:elastic-indices

Rebuild elastic indices remote server

`yarn remote:build:elastic-indices -s <SERVER> -t <TAG>`

#### Description

Will rebuild elasticsearch indices on a remote server using a docker container
with the specified tag. Its recommended to use the currently deployed tag. Using
docker-compose.data.yaml -> rebuildSearch. Inspects its logs with
`yarn remote:log -s <SERVER> --service=rebuildSearch`

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -t   | `<TAG>` ex `v0.19.0`                                              |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/exec.js docker-rebuild-search.sh
```

<a name="remote-deploy" />

### remote:deploy

Deploy a release to a remote server

`yarn remote:deploy -s <SERVER> -t <TAG>`

#### Description

Deploy a release with specified tag to specified server. Note that if the data
model have changed (a new minor version) you should either run the migrations
with [remote:migrate:latest](#remote-migrate-latest) and rebuild the search
indices [remote:build:elastic-indices](#remote-build-elastic-indices) or re
import data with ex [remote:import:data:json](#remote-import-data–json). Note
that the last option will through away current data. Using docker-compose up -d.
Inspects for example deploy api logs with
`yarn remote:log -s <SERVER> --service=api`

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -t   | `<TAG>` ex `v0.19.0`                                              |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/exec.js docker-deploy.sh
```

<a name="remote-download-data-zip" />

### remote:download:data:zip

Download a data zip from a remote server

`yarn remote:download:data:zip -s <SERVER>`

#### Description

Download a zip with data files from a remote server. This zip should originally
have been created locally with [build:data:zip](#build-data-zip) and uploaded
with [remote:upload:data:zip](#remote-upload-data-zip)

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/downloadZippedFiles.js
```

<a name="remote-download-data-sql" />

### remote:download:data:sql

Download dumped sql from remote server

`yarn remote:download:data:sql -s <SERVER>`

#### Description

Download dumped sql from remote server specified by -s. This can be used to test
a migration locally first on data from a production environment

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/downloadSqlDump.js
```

<a name="remote-exec-cmd" />

### remote:exec:cmd

Internal script to exec cmd on server

`yarn remote:exec:cmd`

#### src

```bash
node ./packages/scripts/src/js/execCmd.js
```

<a name="remote-exec-script" />

### remote:exec:script

Internal script to exec script on server

`yarn remote:exec:script`

#### src

```bash
node ./packages/scripts/src/js/exec.js
```

<a name="remote-export-data-sql" />

### remote:export:data:sql

Export data to sql on server

`yarn remote:download:data:sql -s <SERVER>`

#### Description

Export data to sql on server to the file ./data/dump.sql. This can then be
downloaded with [remote:download:data:sql](#remote-download-data-sql)

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/exec.js docker-dump-db-to-sql.sh
```

<a name="remote-git-checkout-tag" />

### remote:git:checkout-tag

Internal script to checkout a git tag on a server. Used bu the deploy script

`yarn remote:git:checkout-tag`

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -t   | `<TAG>` ex `v0.19.0`                                              |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/exec.js git-checkout-tag.sh
```

<a name="remote-import-data-json" />

### remote:import:data:json

Import data from json files on server

`yarn remote:import:data:json -s <SERVER> -t <TAG>`

#### Description

Import data unpacked with [remote:unpack:zip](#remote-unpack-zip). Using
docker-compose.data.yaml -> import. Inspects its logs with
`yarn remote:log -s <SERVER> --service=import`

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -t   | `<TAG>` ex `v0.19.0`                                              |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/exec.js docker-import-data-from-files.sh
```

<a name="remote-import-data-sample" />

### remote:import:data:sample

Import sample data on remote server

`yarn remote:import:data:sample -s <SERVER> -t <TAG>`

#### Description

Importing data from sample files on the server. Using docker-compose.data.yaml
-> import. Inspects its logs with `yarn remote:log -s <SERVER> --service=import`

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -t   | `<TAG>` ex `v0.19.0`                                              |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/exec.js docker-import-data-from-sample.sh
```

<a name="remote-import-data-sql" />

### remote:import:data:sql

Import data from uploaded sql

`yarn remote:import:data:sql -s <SERVER> -t <TAG>`

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -t   | `<TAG>` ex `v0.19.0`                                              |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/importFromSqlDump.js
```

<a name="remote-import-data-zip" />

### remote:import:data:zip

Import data from uploaded zip

`yarn remote:import:data:zip -s <SERVER> -t <TAG>`

#### Description

Using docker-compose.data.yaml -> import. Inspects its logs with
`yarn remote:log -s <SERVER> --service=import`

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -t   | `<TAG>` ex `v0.19.0`                                              |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/importFromZip.js
```

<a name="remote-log" />

### remote:log

Read server logs

`yarn remote:log -s <SERVER> --service=<SERVICE_NAME>`

#### Description

Makes it possible to read server logs from the terminal. Can be followed by grep

#### Args

| Flag      | Description                                                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --service | Service to inspect. One of the services specified in docker-compose.yaml or docker-compose.data.yaml. Its also possible to use the name of the docker container |
| --tail    | Number of rows to tail. Defaults to 2000                                                                                                                        |
| -s        | `<SERVER>` name of server. one of [production, stage, test, demo]                                                                                               |

#### Examples

| Example                                                           | Description                                                   |
| ----------------------------------------------------------------- | ------------------------------------------------------------- |
| `yarn remote:log -s stage --service=api --tail=2000 | grep ERROR` | Read 2000 rows from api service on stage and grep after ERROR |

#### src

```bash
node ./packages/scripts/src/js/remoteLog.js
```

<a name="remote-migrate-latest" />

### remote:migrate:latest

Migrate to latest on specified server

`yarn remote:migrate:latest -s <SERVER> -t <TAG>`

#### Description

Same as [migrate:latest](#migrate-latest) but on the remote server

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -t   | `<TAG>` ex `v0.19.0`                                              |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/exec.js docker-migrate-latest.sh
```

<a name="remote-migrate-one" />

### remote:migrate:one

Migrate 1 on specified server

`yarn remote:migrate:one -s <SERVER> -t <TAG>`

#### Description

Same as [migrate:one](#migrate-one) but on the remote server

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -t   | `<TAG>` ex `v0.19.0`                                              |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/exec.js docker-migrate-one.sh
```

<a name="remote-migrate-undo-one" />

### remote:migrate:undo:one

Undo 1 migration on specified server

`yarn remote:migrate:undo:one -s <SERVER> -t <TAG>`

#### Description

Same as [migrate:undo:one](#migrate-undo-one) but on the remote server

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -t   | `<TAG>` ex `v0.19.0`                                              |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/exec.js docker-migrate-undo-one.sh
```

<a name="remote-print-server-status" />

### remote:print:server-status

Print server status of remote servers

`yarn remote:print:server-status`

#### Description

Will print information related to running services and environment. The server
flag is optional and if omitted information about all servers will be printed

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/checkAllServers.js
```

<a name="remote-unpack-zip" />

### remote:unpack:zip

Unpack a zip file uploaded with
[remote:upload:data:zip](#remote-upload-data-zip)

`yarn remote:unpack:zip -s <SERVER>`

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/unpackDataFiles.js
```

<a name="remote-upload-data-zip" />

### remote:upload:data:zip

Upload zip file to server

`yarn remote:upload:data:zip -s <SERVER>`

#### Description

Will upload zip file created with [build:data:zip](#build-data-zip)

#### Args

| Flag | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| -s   | `<SERVER>` name of server. one of [production, stage, test, demo] |

#### src

```bash
node ./packages/scripts/src/js/uploadDataZip.js
```

## utilities scripts

<a name="build-version-info" />

### build:version-info

Internal script

`yarn build:version-info`

#### src

```bash
node ./packages/scripts/src/js/buildAndCommitVersionInfo.js
```

<a name="delete-test-tags" />

### delete-test-tags

Delete test tags

`yarn delete-test-tags -t <TAG> -u <USERNAME>`

#### Description

This will delete test tags related to provided version from docker hub and from
github. When run it will prompt for docker hub password associated with provided
user

#### Args

| Flag | Description                 |
| ---- | --------------------------- |
| -t   | `<TAG>` ex `v0.19.0`        |
| -u   | `<USERNAME>` for docker hub |

#### Examples

| Example                                      | Description                                                                                   |
| -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `yarn delete-test-tags -t v0.19.0 -u turing` | Will delete all test tags related to v0.19.0 and use the user turing to connect to docker hub |

#### src

```bash
./packages/scripts/src/bash/delete-test-tags
```

<a name="cli-docs" />

### cli:docs

Interact with cli docs from terminal

`yarn cli:docs or yarn cli:docs <SCRIPT_KEY>`

#### Description

Makes it possible to interact with the script documentation from the terminal.
When no args provided it will print all available scripts. With scriptKey
provided it will print documentation for provided script

#### Args

| Flag        | Description                                           |
| ----------- | ----------------------------------------------------- |
| [scriptKey] | If provided will display documentation for script key |

#### src

```bash
node ./packages/scripts/src/js/scriptDocs --packageJsonPath=./package.json --inputPath=./packages/docs/docs/development/cli.js
```

<a name="exec-local" />

### exec:local

Exec a local bash script

`yarn exec:local [scriptName] ...`

#### Description

Will execute a local bash script located in ./packages/scripts/src/bash.
Arguments will be forwarded to script

#### Args

| Flag         | Description                      |
| ------------ | -------------------------------- |
| [scriptName] | Name of script                   |
| ...          | Rest will be forwarded to script |

#### Examples

| Example                      | Description                    |
| ---------------------------- | ------------------------------ |
| `yarn exec:local rm-data.sh` | Will run the rm-data.sh script |

#### src

```bash
node ./packages/scripts/src/js/localExec.js
```

<a name="exec-production" />

### exec:production

Exec a bash script on the production machine

`yarn exec:production [scriptName] ...`

#### Description

Will execute a bash script located in ./packages/scripts/src/bash on the
production server. Arguments will be forwarded to script. Uses configuration in
[./env/.scripts](http://localhost:3000/docs/development/configuration/env#scripts)
to determine the ip and connection details to the production server

#### Args

| Flag         | Description                      |
| ------------ | -------------------------------- |
| [scriptName] | Name of script                   |
| ...          | Rest will be forwarded to script |

#### Examples

| Example                           | Description                    |
| --------------------------------- | ------------------------------ |
| `yarn exec:production rm-data.sh` | Will run the rm-data.sh script |

#### src

```bash
node ./packages/scripts/src/js/remoteExecProduction.js
```

<a name="exec-stage" />

### exec:stage

Exec a bash script on the stage machine

`yarn exec:stage [scriptName] ...`

#### Description

See exec:production

#### src

```bash
node ./packages/scripts/src/js/remoteExecStage.js
```

<a name="exec-test" />

### exec:test

Exec a bash script on the stage machine

`yarn exec:test [scriptName] ...`

#### Description

See exec:production

#### src

```bash
node ./packages/scripts/src/js/remoteExecTest.js
```

<a name="lock-schema" />

### lock-schema

Lock the current model and api schema

`yarn lock-schema`

#### Description

See TODO fix link to something

#### src

```bash
cd ./packages/common && yarn lock-schema && yarn test:schema-locked
```

<a name="pretty" />

### pretty

Run all pretty scripts in all packages

`yarn pretty`

#### src

```bash
yarn pretty:schema && yarn pretty:ui && yarn pretty:backend && yarn pretty:common && yarn pretty:scripts && yarn pretty:migrations
```

<a name="pretty-backend" />

### pretty:backend

Run all pretty scripts in backend package

`yarn pretty:backend`

#### src

```bash
cd ./packages/backend && yarn pretty
```

<a name="pretty-common" />

### pretty:common

Run all pretty scripts in common package

`yarn pretty:common`

#### src

```bash
cd ./packages/common && yarn pretty
```

<a name="pretty-migrations" />

### pretty:migrations

Run all pretty scripts in migrations package

`yarn pretty:migrations`

#### src

```bash
cd ./packages/migrations && yarn pretty
```

<a name="pretty-schema" />

### pretty:schema

Run all pretty scripts in schema package

`yarn pretty:schema`

#### src

```bash
cd ./packages/models && yarn pretty
```

<a name="pretty-scripts" />

### pretty:scripts

Run all pretty scripts in scripts package

`yarn pretty:scripts`

#### src

```bash
cd ./packages/scripts && yarn pretty
```

<a name="pretty-ui" />

### pretty:ui

Run all pretty scripts in ui package

`yarn pretty:ui`

#### src

```bash
cd ./packages/ui && yarn pretty
```

## other scripts
