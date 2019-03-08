---
id: setup-locally-for-development
title: Setup locally for development
sidebar_label: Setup locally
---

## Setup Node.js and yarn

We are using nvm (node version manager) to manage node versions. It is possible
to run node in other ways as long as you have the correct node version
(10.15.1). Node supports different package managers. In this project we are
using yarn with version 1.10.1 (it is important to have this specific version).

### Install nvm

Follow the guide to install nvm
[Install nvm](https://github.com/creationix/nvm#installation)

### Install Node.js version 10.15.1

```bash
nvm install 10.15.1
```

### Set Node v10.15.1 as default

```bash
nvm alias default v10.15.1
```

### Install yarn

[Install yarn](https://yarnpkg.com/lang/en/docs/install)

> TODO: Expand on how to switch between versions

## Clone and setup the repository

### Clone the repository

```bash
git clone https://github.com/DINA-Web/dina-collections.git
```

### Move into directory

```bash
cd dina-collections
```

### Install and setup

```bash
yarn setup
```

More specifically, this command will:

1. Go through the different packages and install dependencies.
2. Create default environment variables located in `./env/.*` based on sample
   env files. This should be fine for you to start with. If you want to learn
   more about the env-variables and adjust them read about them in
   [env documentation](../configuration/env.md) When using the default env files
   the services will run on the following ports:

   - Api -> 4444
   - Elasticsearch -> 9200
   - Keycloak -> 8080
   - Postgres -> 5432
   - Ui -> 3000

3. Run tests. If the tests are not working you should contact a developer in the
   DINA project because then it is some issue with your setup.

## Load sample data and start the application

The following steps assume that your current directory is the application root
directory.

### Load sample data

The repository contains sample data that can be used to test the system. To load
the sample data into the databases run:

```bash
yarn import:data:sample
```

This command will:

1. Start the databases (postgres, elasticsearch and mysql) using docker. The
   first time it will also download required docker images.
2. Load sample data into postgres
3. Create an elasticsearch index with specimen data

### Start API backend

```bash
yarn start:backend
```

This will start elasticsearch and postgres before starting the api service (if
they are not already running from the step before). If you get an error from
`nodemon` about no space, then you might need to
[change the number of file watches allowed](https://stackoverflow.com/a/34664097/3707092).

### Start UI

Note that the UI and the API will not run in the background so before running
the next command, open a new terminal tab.

```bash
yarn start:ui
```

The UI will take a while to render the first time because all files need to be
compiled.

### Configure authentication

[Configure authentication for local development](./configure-auth.md)

### Explore the application

> TODO: Give examples

### Setup editor/IDE

[Setup editor/IDE for development](./setup-editor.md)
