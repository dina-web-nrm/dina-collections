# DINA collections platform

This is the collections platform of DINA Natural History Collections for the Web.
Its a monorepo containing both frontend, api and related resources. Subrepos can be found under ./packages.

* [Backend](packages/backend)
* [Frontend](packages/ui)
* [Common](packages/common)
* [Models](packages/models)
* [Style](packages/dina-style)
* [Keycloak-dev](packages/keycloak)

## Run locally
Either the system can be run fully with docker or partly with docker. When running partly with docker all services but the API (backend) and UI (frontend) is run in docker. Running the API and UI outside docker is prefered when doing development.

This guide assumes you have `git` installed

### Run everything in docker
1. Clone the repository

   ```
   git clone https://github.com/DINA-Web/dina-collections.git
   ```

2. Move into directory

   ```
   cd dina-collections
   ```
3. Setup env-files

	```
	make setup-env
	
	```
	This will setup default env variables. Suitable for most local dev environments but not suitable for any server environments. If you want to look at them or change them go into ./env.
	
4. Edit your /etc/hosts file and add the following entries if you are using the default .env files create from the sample files

   ```
   127.0.0.1 local-ui.dina-web.net
   127.0.0.1 local-style.dina-web.net
   127.0.0.1 local-api.dina-web.net
   127.0.0.1 local-keycloak.dina-web.net
   ```	

5. Start services in dev mode:

	```
	make up-local

	```

6. [Configure keycloak for local development](#run-and-configure-keycloak)

7. Load sample data

	Add sample data to the ./data folder. Right now no checked in sample data is available so the core team has to be contacted

	```
	make load-sample-data

	```
8. Explore services: 
  * UI - [http://local-ui.dina-web.net](http://local-ui.dina-web.net)
  * API - [http://local-api.dina-web.net/docs](local-api.dina-web.net/docs)
  * STYLE - [http://local-style.dina-web.net](local-style.dina-web.net)


9. Stop on your local machine

   ```
   make stop-local
   ```



### Run API and UI outside docker

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

   Then create your own `.env` file in ./packages/backend (see the `sample.env` file in the same location for available values).

8. Load sample data

   This requires access to test data. Contact someone i core team to get test data.

	When test data places in data folder run:	
	
   ```
   yarn setup:loadTestData
   ```

9. Start api

   ```
	yarn start:backend
   ```
   This will start elasticsearch and postgres before starting the api service. Elasticsearch might not be ready fast enough. In that case you will see and error in the api logs and you will have to close the api process and run yarn start:backend again.
   If you get an error from `nodemon` about no space, then you might need to [change the number of file watches allowed](https://stackoverflow.com/a/34664097/3707092).
10. Start ui

   Note that the ui and the api will not run in the background so run them in different tabs. The ui will take a while to render the first time because all files need to be compiled.
   
   ```
	yarn start:ui
   ```

11. [Configure keycloak for local development](#run-and-configure-keycloak)

12. Explore services: 
  * UI - [http://127.0.0.1:3000](http://127.0.0.1:3000)
  * API - [http://127.0.0.1:4444/docs](http://127.0.0.1:4444/docs)


At the moment the local setup will use specific ports that are not configurable. Setting up the application locally will result in the following port allocation:

* Ui -> 3000
* Api -> 4444
* Elasticsearch -> 9200
* Postgres -> 5432
* Kibana -> 5601
* Keycloak -> 8080
* PgAdmin -> 19090

## Run and configure keycloak
 1. Start keycloak

	```
	yarn start:keycloak
   ```
 2. Import keycloak dev configuration

  * Open keycloak admin interface (http://127.0.0.1:8080)
  * Navigate to Administration Console
  * Login (user: admin, password: admin) if you have not changed keycloak env
  * Hover top left nav item (should be master if keycloak is not configured) and press add realm
  * Import file located at ./packages/keycloak/dev-export.json

 

 3. Add test user
  * Navigate to users. press "Users" under "Manage" section in left nav. (Make sure the imported Dina realm is selected)
  * Add user with the following params:

	```
	 username = john doe	
	 Email = johndoe@nrm.se 
	 First Name = John
	 Last Name = Doe
	```
   * Press save
   * Navigate to credentials and set password and confirm (switch temporary to off first)
   * Press the red save button

 
## Server setup
### Run with docker
ATM depricated - Will be updated shortly

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
   
## Create new release

Pull latest master and run:

	
```
yarn version
```

 
  
## Deploy version

To deploy specific version run

```
yarn deploy:local -v 123
```

To deploy latest version run

```
yarn deploy:local:latest
```
Local can be replaced by test, stage and production for remote deploys
