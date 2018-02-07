# DINA collections platform
This is the collections platform of DINA Natural History Collections for the Web.
Its a monorepo containing both frontend, api and related resources. Subrepos can be found under ./packages.

## Get started

### Run with docker locally
1. [Install docker](https://docs.docker.com/install/)


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

7. Install dependencies
  ```
  yarn install
  ```

8. Link packages

  ```
  yarn setup:links
  ```

9. Run tests
```
yarn test
```

### Run frontend mock

1. Start frontend mock server
  
  ```
  yarn start:dina-collections-ui:mock
  ```

### Run frontend with api

1. Start postgres db
  
  ```
  make setup-env
  ```
Or copy ./env/sample.postgres to .postgres

2. Start api

  ```
  yarn start:dina-collections-api
  ```
  
3. Start frontend server

  ```
  yarn start:dina-collections-ui
  ```