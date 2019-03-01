---
id: setup-locally-with-docker
title: Setup with docker
sidebar_label: Setup with docker
---

## Setup locally with docker

### Clone and setup the repository

#### Clone the repository

```
git clone https://github.com/DINA-Web/dina-collections.git
```

#### Move into directory

```
cd dina-collections
```

#### Setup env-files

```
make setup
```

This will setup default env variables. Env variables are located in ./env/.\*
based on sample env files. This should be fine for you to start with. If you
want to learn more about the env-variables and adjust them read about them in
[env documentation](../configuration/env.md)

#### Edit your /etc/hosts file

Add the following entries if you are using the default .env files create from
the sample files:

```
127.0.0.1 local-ui.dina-web.net
127.0.0.1 local-style.dina-web.net
127.0.0.1 local-api.dina-web.net
127.0.0.1 local-keycloak.dina-web.net
```

### Start the application and load sample data

#### Configure authentication

[Configure authentication for local development](./configure-auth.md)

#### Start services in docker:

```
TAG=latest make up

```

This will download and start the latest version of the application images. If
you want to run a specific version you can change latest to the version you want
like `TAG=v0.15.2 make up`.

After this step you should be able to access the application. However you will
need to load sample data to make it work correctly.

#### Load sample data

Add sample data to the ./data folder. Right now no checked in sample data is
available so the core team has to be contacted

```
TAG=latest make load-sample-data

```

#### Explore the application

// TODO: Give examples

#### Stop on your local machine

```
make stop
```
