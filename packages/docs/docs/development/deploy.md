---
id: deploy
title: Deploy
sidebar_label: Deploy
---

Deploying a version means primarily to instruct a server to download docker
images tagged with the specific version, restart the containers with updated
images and potentially run migrations.

To perfom a deploy use the cli script
[`yarn remote:deploy -s <SERVER_NAME> -t <TAG> -m`](./cli#remote-deploy)

The <SERVER_NAME> is one of production, stage, test or demo configured in in
[script env file](./configuration/env#scripts) and the tag is the tag associated
with the version you want to deploy. If -m is provided migrations will be run
after new version is deployed. The -m flag should be used if the previous
version is another minor that the new version, that is if the data model is
updated. See [version for more information](./version#release)

> Example deploying version 0.19.0 with corresponding tag v0.19.0 to production
> instructing the script to run the migrations.
> `yarn remote:deploy -s production -t v0.19.0 -m`

If its the first time a version is deployed to a server either sample data needs
to be imported with [remote:import:data:sample](./cli#remote-import-data-sample)
or actual data with [remote:import:data:json](./cli#remote-import-data-json)
