/* eslint-disable sort-keys */

const serverArg = {
  '-s': '`<SERVER>` name of server. one of [production, stage, test, demo]',
}

const tagArg = {
  '-t': '`<TAG>` ex `v0.19.0`',
}

const usernameArg = {
  '-u': '`<USERNAME>` for docker hub',
}

module.exports = {
  meta: {
    preamble: `---
id: cli
title: Command Line Interfce
sidebar_label: CLI
---
<!--- Note! This is generated from cli.js so edits directly in the cli.md will be overwritten. -->
This is a documentation of the scripts avaialble from the root level. All these scripts are defined in root package.json and in general the scripts defined in package.json either call a script provided by a dependency or one or more scripts from the script package. This script definition is available in the documentation for each script and to get more detailed information about how a script works inspect the src

    `,
    outputPath: 'packages/docs/docs/development/cli.md',
  },
  groups: [
    'setup',
    'data',
    'test',
    'local-services',
    'build',
    'release',
    'remote-services',
    'utilities',
  ],
  groupDescriptions: {
    setup:
      'Scripts for setting up the system including installing the different packages and setting up env variables',
    data: 'Scripts to work with data locally',
    test: 'Scripts for test',
    'local-services': 'Scripts managing local services',
    'remote-services': `
These scripts are used to interact with remote servers. The ips and connection details of these servers are specified in [script env file](../configuration/env#scripts).
Right now its supported with 4 different server roles: production, stage, test and demo',
utilities: 'Different utility scripts`,
  },
  scripts: {
    build: {
      description: 'Internally call build:ui and build:semantic-ui',
      group: 'build',
      short: 'Build ui and semantic ui',
    },
    'build:changelog': {
      description:
        'Will create or update ./CHANGELOG.md based on the git merged branch history. Using [auto-changelog](https://www.npmjs.com/package/auto-changelog) under the hood.',
      group: 'build',
      short: 'Build changelog',
    },
    'build:common:schema:api': {
      description:
        'Will build the api schema for the current backend and model version. Read more about schema generation in the common package',
      group: 'build',
      short: 'Build schema api',
    },
    'build:common:schema:models': {
      description:
        'Will build the models schema for the current  model version. Read more about schema generation in the common package',
      group: 'build',
      short: 'Build schema models',
    },
    'build:data:zip': {
      description:
        'Will create a new exportable data.zip based on the current data files located in ./data. Note that this will replace any existing ./data/data.zip. This generated file can then be uploaded to any configured server using [remote:upload:data:zip](#remote-upload-data-zip) ',
      group: 'data',
      short: 'Build an exportable data.zip',
    },
    'build:docker:backend': {
      description: 'Used by ci to build a docker image for the backend package',
      group: 'build',
      short: 'Build backend docker',
    },
    'build:docker:migrations': {
      description:
        'Used by ci to build a docker image for the migrations package',
      group: 'build',
      short: 'Build migrations docker',
    },
    'build:docker:style': {
      description: 'Used by ci to build a docker image for the style package',
      group: 'build',
      short: 'Build style docker',
    },
    'build:docker:ui': {
      description: 'Used by ci to build a docker image for the ui package',
      group: 'build',
      short: 'Build ui docker',
    },
    'build:docs': {
      description: 'Will build the static files for the doc package',
      group: 'build',
      short: 'Build docs package',
    },
    'build:index-specimen:json': {
      description: 'Will build the elasticsearch specimen index',
      group: 'build',
      short: 'Build specimen elasticsearch index',
    },
    'build:markdown': {
      description:
        'Will build markdown files using different scripts. Also interpolate markdown files.',
      group: 'build',
      short: 'Build markdown',
    },
    'build:markdown:cli': {
      description: 'Will create this cli documentation',
      group: 'build',
      short: 'Create cli documentation',
    },
    'build:semantic-ui': {
      description: 'Will build the static files for the style package',
      group: 'build',
      short: 'Build docs style package',
    },
    'build:trees': {
      group: 'build',
      short: 'Build tree documentation in backend, common and ui',
    },
    'build:trees:backend': {
      group: 'build',
      short: 'Build tree documentation in backend',
    },
    'build:trees:common': {
      group: 'build',
      short: 'Build tree documentation in common',
    },
    'build:trees:ui': {
      group: 'build',
      short: 'Build tree documentation in ui',
    },
    'build:ui': {
      description:
        'This will transpile es6 to es5 and create a production ready dist of the ui. Not needed in dev mode',
      group: 'build',
      short: 'Build ui package',
    },
    'build:version-info': {
      group: 'utilities',
      short: 'Internal script',
    },
    'delete-test-tags': {
      description:
        'This will delete test tags related to provided version from docker hub and from github. When run it will prompt for docker hub password associated with provided user',
      group: 'utilities',
      short: 'Delete test tags',
      usage: 'yarn delete-test-tags -t <TAG> -u <USERNAME>',
      args: {
        ...tagArg,
        ...usernameArg,
      },
      examples: {
        'yarn delete-test-tags -t v0.19.0 -u turing':
          'Will delete all test tags related to v0.19.0 and use the user turing to connect to docker hub',
      },
    },
    'cli:docs': {
      args: {
        '[scriptKey]': 'If provided will display documentation for script key',
      },
      description:
        'Makes it possible to interact with the script documentation from the terminal. When no args provided it will print all available scripts. With scriptKey provided it will print documentation for provided script',
      group: 'utilities',
      short: 'Interact with cli docs from terminal',
      usage: 'yarn cli:docs or yarn cli:docs <SCRIPT_KEY>',
    },
    'exec:local': {
      args: {
        '[scriptName]': 'Name of script',
        '...': 'Rest will be forwarded to script',
      },
      description:
        'Will execute a local bash script located in ./packages/scripts/src/bash. Arguments will be forwarded to script',
      examples: {
        'yarn exec:local rm-data.sh': 'Will run the rm-data.sh script',
      },
      group: 'utilities',
      short: 'Exec a local bash script',
      usage: 'yarn exec:local [scriptName] ...',
    },

    'exec:production': {
      args: {
        '[scriptName]': 'Name of script',
        '...': 'Rest will be forwarded to script',
      },
      description:
        'Will execute a bash script located in ./packages/scripts/src/bash on the production server. Arguments will be forwarded to script. Uses configuration in [./env/.scripts](http://localhost:3000/docs/development/configuration/env#scripts) to determine the ip and connection details to the production server',
      examples: {
        'yarn exec:production rm-data.sh': 'Will run the rm-data.sh script',
      },
      group: 'utilities',
      short: 'Exec a bash script on the production machine',
      usage: 'yarn exec:production [scriptName] ...',
    },
    'exec:stage': {
      description: 'See exec:production',
      group: 'utilities',
      short: 'Exec a bash script on the stage machine',
      usage: 'yarn exec:stage [scriptName] ...',
    },
    'exec:test': {
      description: 'See exec:production',
      group: 'utilities',
      short: 'Exec a bash script on the stage machine',
      usage: 'yarn exec:test [scriptName] ...',
    },

    'export:data:sample:sql': {
      description:
        'Will export sample data to to ./data/sample.dump.sql. To be able to do this it will first import sample from ./data.sample.*.json. Note that this will first drop the current database. These operations are done on the dev database. This sample data will later be used for testing. Note that this should be run after updating sample data or updating the data model',
      group: 'data',
      short: 'Export data from sql',
    },

    'export:data:sql': {
      description:
        'Will export the current sql data to ./data/dump.sql. Unlike export:data:sample:sql it will not import any data first',
      group: 'data',
      short: 'Export data from sql',
    },
    'export:elastic-indices:json': {
      description: 'Will export the elastic-indices to .index.*',
      group: 'data',
      short: 'Export data from elasticsearch indices',
    },
    'export:elastic-indices:sample': {
      description:
        'Will export sample elastic-indices to sample.index.*. First it will create elastic-sample data by dropping the postgres db, importing sample data into postgres and creating the elastic indices. Note that this will drop the current dev database.',
      group: 'data',
      short: 'Export data from elasticsearch indices to sample files',
    },
    'import:data:json': {
      description:
        'Will import data from json files (./data/*.json) to postgres and rebuild elastic indices',
      group: 'data',
      short: 'Import json files',
    },
    'import:data:sample': {
      description:
        'Will import data from sample json files (./data/sample.*.json) to postgres and rebuild elastic indices. When doing this the current json files (not the sample files) in ./data will be removed',
      group: 'data',
      short: 'Import sample json files',
    },
    'import:data:sql': {
      description:
        'Will import data from sample json files (./data/sample.*.json) to postgres and rebuild elastic indices. When doing this the current json files (not the sample files) in ./data will be removed',
      group: 'data',
      short: 'Import data from sql',
    },
    'import:data:zip': {
      description: 'Will import data from zip file generated by build:data:zip',
      group: 'data',
      short: 'Import data from zip file',
    },
    'import:elastic-indices:json': {
      description:
        'Will import data from files generated by [export:elastic-indices:json](#export-elastic-indices-json)',
      group: 'data',
      short: 'Import data into elasticsearch ',
    },
    'import:elastic-indices:sample': {
      description:
        'Will import data from files generated by [import:elastic-indices:json](#import-elastic-indices-json)',
      group: 'data',
      short: 'Import data into elasticsearch from sample files',
    },
    'install:backend': {
      description: 'See [install](#install)',
      group: 'setup',
      short: 'Installbackend package',
    },
    'install:common': {
      description: 'See [install](#install)',
      group: 'setup',
      short: 'Install common package',
    },
    'install:docs': {
      description: 'See [install](#install)',
      group: 'setup',
      short: 'Install docs package',
    },
    'install:migrations': {
      description: 'See [install](#install)',
      group: 'setup',
      short: 'Install migrations package',
    },
    'install:schema': {
      description: 'See [install](#install)',
      group: 'setup',
      short: 'Install schema (models) package',
    },
    'install:scripts': {
      description: 'See [install](#install)',
      group: 'setup',
      short: 'Install script package',
    },
    'install:semantic-ui': {
      description: 'See [install](#install)',
      group: 'setup',
      short: 'Install style package',
    },
    'install:ui': {
      description: 'See [install](#install)',
      group: 'setup',
      short: 'Install ui package',
    },
    install: {
      description:
        'Will call all package specific install scripts. These scripts will enter their package and run [yarn install](https://yarnpkg.com/lang/en/docs/cli/install/) ',
      group: 'setup',
      short: 'Install all packages',
    },
    'lock-schema': {
      description: 'See TODO fix link to something',
      group: 'utilities',
      short: 'Lock the current model and api schema',
    },
    'migrate:latest': {
      description:
        'Will run postgres schema migrations specified in the migrations repository up to the latest version. Under the hood [sequelize migrations](http://docs.sequelizejs.com/manual/migrations.html) are used. ',
      group: 'data',
      short: 'Migrate postgres db to latest version',
    },
    'migrate:one': {
      description:
        'Same as [migrate:latest](#migrate-latest) expect that only one migration is performed',
      group: 'data',
      short: 'Will run one postgres schema migration',
    },
    'migrate:undo:one': {
      description:
        'Inspect [sequelize migrations](http://docs.sequelizejs.com/manual/migrations.html) for details',
      group: 'data',
      short: 'Will undo one postgres schema migration',
    },
    postversion: {
      description: 'Inspect src for more details',
      group: 'release',
      short: 'Internal hook activated after running version scripts',
    },
    pretty: {
      group: 'utilities',
      short: 'Run all pretty scripts in all packages',
    },
    'pretty:backend': {
      group: 'utilities',
      short: 'Run all pretty scripts in backend package',
    },
    'pretty:common': {
      group: 'utilities',
      short: 'Run all pretty scripts in common package',
    },
    'pretty:migrations': {
      group: 'utilities',
      short: 'Run all pretty scripts in migrations package',
    },
    'pretty:schema': {
      group: 'utilities',
      short: 'Run all pretty scripts in schema package',
    },
    'pretty:scripts': {
      group: 'utilities',
      short: 'Run all pretty scripts in scripts package',
    },
    'pretty:ui': {
      group: 'utilities',
      short: 'Run all pretty scripts in ui package',
    },

    preversion: {
      group: 'release',
      short: 'Internal hook activated before running version scripts',
    },
    'remote:build:elastic-indices': {
      args: {
        ...tagArg,
        ...serverArg,
      },
      description:
        'Will rebuild elasticsearch indices on a remote server using a docker container with the specified tag. Its recommended to use the currently deployed tag. Using docker-compose.data.yaml -> rebuildSearch. Inspects its logs with `yarn remote:log -s <SERVER> --service=rebuildSearch`',
      usage: 'yarn remote:build:elastic-indices -s <SERVER> -t <TAG>',
      group: 'remote-services',
      short: 'Rebuild elastic indices remote server',
    },
    'remote:deploy': {
      args: {
        ...tagArg,
        ...serverArg,
      },
      description:
        'Deploy a release with specified tag to specified server. Note that if the data model have changed (a new minor version) you should either run the migrations with [remote:migrate:latest](#remote-migrate-latest) and rebuild the search indices [remote:build:elastic-indices](#remote-build-elastic-indices) or re import data with ex [remote:import:data:json](#remote-import-data–json). Note that the last option will through away current data. Using docker-compose up -d. Inspects for example deploy api logs with `yarn remote:log -s <SERVER> --service=api`',
      group: 'remote-services',
      short: 'Deploy a release to a remote server',
      usage: 'yarn remote:deploy -s <SERVER> -t <TAG>',
    },
    'remote:download:data:zip': {
      args: {
        ...serverArg,
      },
      description:
        'Download a zip with data files from a remote server. This zip should originally have been created locally with [build:data:zip](#build-data-zip) and uploaded with [remote:upload:data:zip](#remote-upload-data-zip)',
      group: 'remote-services',
      short: 'Download a data zip from a remote server',
      usage: 'yarn remote:download:data:zip -s <SERVER>',
    },
    'remote:download:data:sql': {
      args: {
        ...serverArg,
      },
      description:
        'Download dumped sql from remote server specified by -s. This can be used to test a migration locally first on data from a production environment',
      group: 'remote-services',
      usage: 'yarn remote:download:data:sql -s <SERVER>',
      short: 'Download dumped sql from remote server',
    },
    'remote:exec:cmd': {
      group: 'remote-services',
      short: 'Internal script to exec cmd on server',
    },
    'remote:exec:script': {
      group: 'remote-services',
      short: 'Internal script to exec script on server',
    },
    'remote:export:data:sql': {
      args: {
        ...serverArg,
      },
      description:
        'Export data to sql on server to the file ./data/dump.sql. This can then be downloaded with [remote:download:data:sql](#remote-download-data-sql)',
      group: 'remote-services',
      usage: 'yarn remote:download:data:sql -s <SERVER>',
      short: 'Export data to sql on server',
    },
    'remote:git:checkout-tag': {
      args: {
        ...tagArg,
        ...serverArg,
      },
      group: 'remote-services',
      short:
        'Internal script to checkout a git tag on a server. Used bu the deploy script',
    },
    'remote:import:data:json': {
      args: {
        ...tagArg,
        ...serverArg,
      },
      description:
        'Import data unpacked with [remote:unpack:zip](#remote-unpack-zip). Using docker-compose.data.yaml -> import. Inspects its logs with `yarn remote:log -s <SERVER> --service=import`',
      group: 'remote-services',
      short: 'Import data from json files on server',
      usage: 'yarn remote:import:data:json -s <SERVER> -t <TAG>',
    },
    'remote:import:data:sample': {
      args: {
        ...tagArg,
        ...serverArg,
      },
      description:
        'Importing data from sample files on the server. Using docker-compose.data.yaml -> import. Inspects its logs with `yarn remote:log -s <SERVER> --service=import`',
      group: 'remote-services',
      short: 'Import sample data on remote server',
      usage: 'yarn remote:import:data:sample -s <SERVER> -t <TAG>',
    },
    'remote:import:data:sql': {
      args: {
        ...tagArg,
        ...serverArg,
      },
      group: 'remote-services',
      short: 'Import data from uploaded sql',
      usage: 'yarn remote:import:data:sql -s <SERVER> -t <TAG>',
    },
    'remote:import:data:zip': {
      args: {
        ...tagArg,
        ...serverArg,
      },
      description:
        'Using docker-compose.data.yaml -> import. Inspects its logs with `yarn remote:log -s <SERVER> --service=import`',
      group: 'remote-services',
      short: 'Import data from uploaded zip',

      usage: 'yarn remote:import:data:zip -s <SERVER> -t <TAG>',
    },
    'remote:log': {
      args: {
        '--service':
          'Service to inspect. One of the services specified in docker-compose.yaml or docker-compose.data.yaml. Its also possible to use the name of the docker container',
        '--tail': 'Number of rows to tail. Defaults to 2000 ',
        ...serverArg,
      },
      description:
        'Makes it possible to read server logs from the terminal. Can be followed by grep',
      examples: {
        'yarn remote:log -s stage --service=api --tail=2000 | grep ERROR ':
          'Read 2000 rows from api service on stage and grep after ERROR',
      },
      group: 'remote-services',
      short: 'Read server logs',
      usage: 'yarn remote:log -s <SERVER> --service=<SERVICE_NAME>',
    },
    'remote:migrate:latest': {
      args: {
        ...tagArg,
        ...serverArg,
      },
      description:
        'Same as [migrate:latest](#migrate-latest) but on the remote server',
      group: 'remote-services',
      short: 'Migrate to latest on specified server',
      usage: 'yarn remote:migrate:latest -s <SERVER> -t <TAG>',
    },
    'remote:migrate:one': {
      args: {
        ...tagArg,
        ...serverArg,
      },
      description:
        'Same as [migrate:one](#migrate-one) but on the remote server',
      group: 'remote-services',
      short: 'Migrate 1 on specified server',
      usage: 'yarn remote:migrate:one -s <SERVER> -t <TAG>',
    },
    'remote:migrate:undo:one': {
      args: {
        ...tagArg,
        ...serverArg,
      },
      description:
        'Same as [migrate:undo:one](#migrate-undo-one) but on the remote server',
      group: 'remote-services',
      short: 'Undo 1 migration on specified server',
      usage: 'yarn remote:migrate:undo:one -s <SERVER> -t <TAG>',
    },

    'remote:print:server-status': {
      args: {
        ...serverArg,
      },
      description:
        'Will print information related to running services and environment. The server flag is optional and if omitted information about all servers will be printed',
      group: 'remote-services',
      short: 'Print server status of remote servers',
    },
    'remote:unpack:zip': {
      args: {
        ...serverArg,
      },
      group: 'remote-services',
      short:
        'Unpack a zip file uploaded with [remote:upload:data:zip](#remote-upload-data-zip)',
      usage: 'yarn remote:unpack:zip -s <SERVER>',
    },
    'remote:upload:data:zip': {
      args: {
        ...serverArg,
      },
      description:
        'Will upload zip file created with [build:data:zip](#build-data-zip)',
      group: 'remote-services',
      short: 'Upload zip file to server',
      usage: 'yarn remote:upload:data:zip -s <SERVER>',
    },
    setup: {
      description:
        'Will run scripts multiple scripts to setup environment variables, sample data, install node modules, link packages and run tests. Similar to [setup:dev](#setup:dev) with the difference that this script calls the script to setup environment variables for running the application fully in docker. For more information see [setup locally](../setup/setup-locally-for-development) and [setup for docker](../setup/setup-locally-with-docker)',
      group: 'setup',
      short: 'Run to get started for running with docker',
    },
    'setup:dev': {
      description:
        'Will run scripts multiple scripts to setup environment variables, sample data, install node modules, link packages and run tests. Similar to [setup](#setup) but setups the application to run ui and api outside docker. Recommended setup for development',
      group: 'setup',
      short: 'Run to get started for development ',
    },
    'setup:env': {
      description:
        'Setup env files ./env from ./env/sample. The files suffixed with .dev will not be used',
      group: 'setup',
      short: 'Setup env files for from sample env files',
    },

    'setup:env:ci:docker': {
      description:
        'Setup env files ./env from ./env/ci. Used by the ci when running tests that depends on docker',
      group: 'setup',
      short: 'Setup env files for ci when using docker',
    },

    'setup:env:ci:local': {
      description:
        'Setup env files ./env from ./env/ci. Used by the ci when running tests that runs outside docker',
      group: 'setup',
      short: 'Setup env files for ci when not using docker',
    },

    'setup:env:dev': {
      description:
        'Setup env files ./env from ./env/sample. If a sample file is suffixed with .dev it will be used instead of the file not suffixed with dev',
      group: 'setup',
      short: 'Setup env files for development',
    },

    'setup:links': {
      group: 'setup',
      short: 'Run all other setup link scripts',
    },
    'setup:links:backend': {
      group: 'setup',
      short: 'Setup npm links for backend package',
    },
    'setup:links:common': {
      group: 'setup',
      short: 'Setup npm links for common package',
    },
    'setup:links:migrations': {
      group: 'setup',
      short: 'Setup npm links for migrations package',
    },
    'setup:links:scripts': {
      group: 'setup',
      short: 'Setup npm links for scripts package',
    },
    'setup:links:ui': {
      group: 'setup',
      short: 'Setup npm links for ui package',
    },
    'setup:sample-data': {
      description:
        'Will copy sample data files ./data/sample.*.json to ./data/.*.json',
      group: 'setup',
      short: 'Will copy sample data files to json files',
    },
    'start:backend': {
      description: 'Will start the backend outside docker ',
      group: 'local-services',
      short: 'Start backend for development',
    },
    'start:dbs': {
      group: 'local-services',
      short: 'Start postgres, mysql and elasticsearch',
    },
    'start:docs': {
      group: 'local-services',
      short: 'Start docs docker',
    },
    'start:elasticsearch': {
      group: 'local-services',
      short: 'Start elasticsearch docker',
    },
    'start:keycloak': {
      group: 'local-services',
      short: 'Start keycloak docker',
    },
    'start:kibana': {
      group: 'local-services',
      short: 'Start kibana docker',
    },
    'start:mysql': {
      group: 'local-services',
      short: 'Start mysql docker',
    },
    'start:postgres': {
      group: 'local-services',
      short: 'Start postgres docker',
    },
    'start:ui': {
      group: 'local-services',
      short: 'Start ui for development',
    },
    test: {
      group: 'test',
      short: 'Run all unit tests',
    },
    'test:all': {
      group: 'test',
      short: 'Run all tests',
    },
    'test:backend:integration': {
      group: 'test',
      short: 'Run integration tests in backend package',
    },
    'test:backend:unit': {
      group: 'test',
      short: 'Run unit tests in backend package',
    },
    'test:common': {
      group: 'test',
      short: 'Run tests in common package',
    },
    'test:common:schema-locked': {
      group: 'test',
      short: 'Run tests in common package to ensure that the schema is locked',
    },
    'test:e2e': {
      group: 'test',
      short: 'Run e2e tests in ui package',
    },
    'test:models': {
      group: 'test',
      short: 'Run tests in models package',
    },
    'test:ui': {
      group: 'test',
      short: 'Run tests in ui package',
    },

    uninstall: {
      group: 'setup',
      short: 'Uninstall all node modules from all package',
    },
    'uninstall:backend': {
      group: 'setup',
      short: 'Uninstall node_modules in backend package',
    },
    'uninstall:common': {
      group: 'setup',
      short: 'Uninstall node_modules in common package',
    },
    'uninstall:docs': {
      group: 'setup',
      short: 'Uninstall node_modules in docs package',
    },
    'uninstall:migrations': {
      group: 'setup',
      short: 'Uninstall node_modules in migrations package',
    },
    'uninstall:schema': {
      group: 'setup',
      short: 'Uninstall node_modules in models package',
    },
    'uninstall:scripts': {
      group: 'setup',
      short: 'Uninstall node_modules in script package',
    },
    'uninstall:semantic-ui': {
      group: 'setup',
      short: 'Uninstall node_modules in style package',
    },
    'uninstall:ui': {
      group: 'setup',
      short: 'Uninstall node_modules in ui package',
    },
    version: {
      group: 'release',
      short:
        'Internal script. Use version:patch, version:minor, version:rc or version:test instead',
    },

    'version:minor': {
      description:
        'Will run version:release with version incremented according to semver minor',
      group: 'release',
      short: 'Create a minor release',
    },
    'version:patch': {
      description:
        'Will run version:release with version incremented according to semver patch',
      group: 'release',
      short: 'Create a patch release',
    },

    'version:rc': {
      description:
        'This command will create a release candidate. When run it will prompt the user for the name of the release candidate. Should be named after the coming release suffixed with -rc',
      group: 'release',
      short: 'Release a release candidate',
    },

    'version:release': {
      description:
        'This command will create a release. When run it will prompt the user for the name of the release [TODO] add reference to release. This script will then create a new git tag and push to github. This will trigger travis to run all tests and if they succeed build docker images and push to docker hub. Later this version can be deployed using [remote:deploy](#remote:deploy)',
      group: 'release',
      short: 'Create a release',
    },

    'version:test': {
      description:
        'This command will create a test release. When run it will prompt the user for the name of the test version. Should be current version followed by -test-[name]-[index] ex 0.19.1-test-anton-1 for the first test version. This script will then create a new git tag and push to github. This will trigger travis to run all tests and if they succeed build docker images and push to docker hub',
      group: 'release',
      short: 'Create a test release',
    },
  },
}
