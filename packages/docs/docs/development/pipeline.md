---
id: pipeline
title: CI and deployment pipeline
sidebar_label: CI and deployment
---

We are working with continuous integration (CI) to test code changes. We deploy
manually to our different environments, using tagged Docker images hosted on
[Docker Hub](https://hub.docker.com/), which we also create manually. In the
future, more of the pipeline could be automated.

## Continuous integration

We use [Travis CI](https://travis-ci.org), which is provided for free to
open-source projects on GitHub, to run our CI. To strike a balance between
time-to-feedback and end-to-end coverage, we have two levels of CI builds:

- **Push to feature branch:** Run linting, unit and integration tests
- **New git tag or change in `master`:** Run all of the above, plus end-to-end
  tests

Since we only deploy tagged Docker images and a new tag must pass CI to be
pushed to Docker Hub, we considered it an acceptable trade-off that a merge into
master can occasionally fail in CI, as that means a new push to a feature branch
takes ~5 minutes instead of ~20 minutes to go through CI. We found that with CI
taking upwards of 20 minutes, small improvements toward cleaner code would
sometimes be skipped to avoid clogging up the pipeline, but it is important to
keep the code clean and faster CI builds facilitates that.

### Build configuration

The configuration of the CI builds is in
[.travis.yml](https://github.com/DINA-Web/dina-collections/blob/master/.travis.yml)
in the repository root. Presently we have the following build stages.

```yaml
stages:
  - name: build
    if: branch = master OR tag IS present
  - name: test
  - name: cleanup
    if: branch = master AND tag IS blank
  - name: publish tag and cleanup
    if: tag IS present
```

The `test` stage runs for all builds, but the end-to-end test jobs in that stage
are configured to only run `if: branch = master AND tag IS blank`. The `build`
stage only runs on tag or master, and lastly `cleanup` runs on master whereas
`publish tag and cleanup` runs on tag.

The `build` stage builds temporary Docker images, which are tagged with the
Travis build number, which is an incrementing integer. The end-to-end tests run
on those images, to replicate the server environment, and then they are either
removed in the `cleanup` stage, or re-tagged with the relevant tag and pushed to
Docker Hub in the `publish...` stage. The temporary images are also removed if
any job fails.

Here are examples of real builds on Travis for:

- [Push to feature branch](https://travis-ci.org/DINA-Web/dina-collections/builds/514668028)
- [Merge into master](https://travis-ci.org/DINA-Web/dina-collections/builds/514690822)
- [New tag](https://travis-ci.org/DINA-Web/dina-collections/builds/515082657)

The run time is sometimes longer than the critical path, because Travis limits
how many jobs a repository can have running concurrently, meaning that when two
builds are started after each other, the first will go faster since the second
will be waiting for virtual machines to become available. This also means it
generally makes sense to put the longest job in each stage first, as that is
likely to start first, when there is a queue.

### Job configuration

Each CI build has one or more stages and each stage has one or more job. Each
job has two main parts: install and script, but the
[job lifecycle](https://docs.travis-ci.com/user/job-lifecycle/) can be
configured in more detail.

In the scripts package there are various
[scripts prefixed with `ci-`](https://github.com/DINA-Web/dina-collections/tree/master/packages/scripts/src/bash)
that are applied in different parts of the job lifecycle. In `.travis.yml` we
specify those scripts, some of them are applied to all jobs and some are
specific to certain jobs. Then we configure each job with environment variables
to determine what part of each script runs for that job.

## Delivery and deployment

We use three different kinds of tags:

| Tag type          | Example       | CLI                    |
| ----------------- | ------------- | ---------------------- |
| release           | v0.18.0       | `yarn version:release` |
| release candidate | v0.18.0-rc1   | `yarn version:rc`      |
| test              | v0.18.0-test1 | `yarn version:test`    |

The `rc` and `test` scripts check that the version provided includes "rc" or
"test" and those tags are ignored in the
[CHANGELOG](https://github.com/DINA-Web/dina-collections/blob/master/CHANGELOG.md),
except when a release candidate is the latest tag.

Release candidates are used to make intermediate deploys to the stage server for
QA. Test tags can be used at any time during development and are typically
tested on the test server.

Release versions are first deployed to stage and after manual QA it is deployed
to production.

When deploying to a remote environment first the relevant git tag should be
checked out, in case it includes some changes to the scripts that are executed
on the server. The `remote:*` scripts require the parameters `-s` for
environment (test, stage, production, demo) and `-t` for tag.

```bash
yarn remote:git:checkout-tag -s stage -t v0.18.0
yarn remote:deploy -s stage -t v0.18.0
```

> TODO: Change to run checkout-tag as part of deploy script
>
> TODO: Add information about data migration
