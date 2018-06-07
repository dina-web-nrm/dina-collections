# DINA collections platform

This is the collections platform of DINA Natural History Collections for the Web.
Its a monorepo containing both frontend, api and related resources. Subrepos can be found under ./packages.

* [Backend](packages/backend)
* [Frontend](packages/ui)
* [Common](packages/common)
* [Models](packages/models)
* [Style](packages/dina-style)

## Get started

### Run with docker locally

1. [Install docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/)

2. Clone the repository

   ```
   git clone https://github.com/DINA-Web/dina-collections.git
   ```

3. Move into directory

   ```
   cd dina-collections
   ```

4. create sample .env-files

   ```
   make setup-env
   ```

5. Edit your /etc/hosts file and add the following entries if you are using the default .env files create from the sample files

   ```
   127.0.0.1 local-cm-mock.dina-web.net
   127.0.0.1 local-cm.dina-web.net
   127.0.0.1 local-api-docs.dina-web.net
   127.0.0.1 local-style.dina-web.net
   127.0.0.1 local-api.dina-web.net
   ```

6. Start on your local machine with docker compose

   ```
   make up-dev
   ```

7. Stop on your local machine with docker compose

   ```
   make stop-dev
   ```

### Development setup

This guide assumes you have `git` installed

1. [Install nvm](https://github.com/creationix/nvm#installation)
2. Install Node.js version 8.9.1

   ```
   nvm install 8.9.1
   ```

3. Set Node v8.9.1 as default

   ```
   nvm alias default v8.9.1
   ```

4. [Install yarn](https://yarnpkg.com/lang/en/docs/install/)
5. Clone the repository

   ```
   git clone https://github.com/DINA-Web/dina-collections.git
   ```

6. Move into directory

   ```
   cd dina-collections
   ```

7. Install dependencies, links and env and run tests

   ```
   yarn setup
   ```

8. Setup/define environment variables

   First run the script to create files based on the samples in ./env.

   ```
   make setup-env
   ```

   Then create your own `.env` file in ./packages/backend (see the `sample.env` file in the same location for available values).

### Run application

1. Start backend

   ```
   yarn start:backend
   ```

   If you get an error from `nodemon` about no space, then you might need to [change the number of file watches allowed](https://stackoverflow.com/a/34664097/3707092).

2) Start frontend server

   ```
   yarn start:ui
   ```
