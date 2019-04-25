---
id: apps
title: Apps
sidebar_label: Apps
---

The different available apps are specified in `./src/apps`. From here the apps
will be bootstrapped by calling different bootstrap functions from the
[bootstrap lib](#bootstrap). They are all configured with env variables
explained in [env documentation](../development/configuration/env.md). Even
though they are described as separate apps, they use the same codebase.

## API

The API is responsible for exposing the databases, through a JSON API, to the ui
or other services. The exposed API is [json-api](https://jsonapi.org/) compliant
and is documented using [OpenApi](https://swagger.io/docs/specification/about/).
For full APIxs documentation visit [api docs](/api/docs).

The API consists of a number of sub-APIs, called [services](#services). They are
created based on the [serviceConfiguration](#serviceConfiguration).

In dev mode its possible (and default) to configure the API to also run a
[worker](#worker) (for the convenience of not running another process)

## Worker

The worker is responsible for performing offline jobs. The worker app starts a
worker that will poll the job table to find jobs to be done. Starting,
succeeding and failing a job will be logged to the job table. It is possible to
configure what types of job each worker should do. This makes it possible to
have dedicated workers that do more complex jobs like re-indexing the whole
specimen search index in elasticsearch and at the same time have another worker
that can perform smaller jobs that are expected to be finished faster (like
re-indexing a single specimen). Right now each worker runs a non-exposed version
of the API to communicate with the database. When interacting with the API it is
using the [service interactor](#service-interator). Later it will be possible
for the worker to not run its own API but instead use the service interactor to
communicate with the main API or another dedicated internal API.

## Data

The data app is responsible for importing data and serve as an entrypoint for
rebuilding the specimen search index. This app differs from the worker and the
API because it exits after it is done with its task, while the api and the
worker are ongoing processes.
