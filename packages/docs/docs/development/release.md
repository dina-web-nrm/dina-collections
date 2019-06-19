---
id: release
title: Release
sidebar_label: Release
---

A release is a process containing multiple steps starting with planning what
should be included in a release and ends with a new release deployed to a
production server. We follow a release schedule with deploying a release
candidate version to stage every **Thursday** and deploy a release version to
production every **Monday**. Below follows the steps of a release.

1. [Define the release](#define-the-release)
2. [Pre release tasks](#pre-release-tasks)
3. [Create a release candidate version](#create-a-release-candidate-version)
4. [Deploy the release candidate to stage](#deploy-the-release-candidate-to-stage)
5. [Testing on stage](#testing-on-stage)
6. [Fix potential issues](#fix-potential-issues)
7. [Create a release version](#create-a-release-version)
8. [Deploy to production](#deploy-to-production)
9. [Post release checklist](#post-release-checklist)

## Define the release

The first step in the release process is to define the upcoming release. This
mean determine what number the upcoming release will have and what features and
bug-fixes that will be included. In our setup the release will be done from the
master branch so in the end what will go into the release will be determined by
what have been merged into master since the last release. Its however important
to communicate to the rest of the team what will be included. The version of the
upcoming release is a minor or patch increment from the previous release see
[`version release documentation`](./version#release) for more information of
version number.

## Pre release tasks

> 1. Inform everyone in the team about what will be included in the upcoming
>    release
> 2. Prepare a new version for the user manual if new features are added in the
>    release
> 3. Potentially inform users of the upcoming release
> 4. Ensure data model documentation is updated. Both markdown and images.

## Create a release candidate version

Thu purpose of the release candidate is to make the new features and bug fixes
accessible for the whole team to be able to do manual testing in a stage
environment.

Follow in instructions in the
[version documentation for release candidate](./version#release-candidate) and
run [`yarn version:rc`](./cli#version-rc)

## Deploy the release candidate to stage

In order to test the new release candidate it has to be deployed to stage.
Follow in instructions in [deploy documentation](./deploy) and run
[`yarn remote:deploy -s stage -t <NEW_RELEASE_CANDIDATE_VERSION> -m`](./cli#remote:deploy)

## Testing on stage

After the release candidate is released to stage QA testing should be performed.
What testing is needed depends on what is included in the release. It can be a
good idea to check the
[CHANGELOG](https://github.com/DINA-Web-nrm/dina-collections/blob/master/CHANGELOG.md)
for an overview of what is included in the release

## Fix potential issues

If bugs surface during the testing on stage these should be fixed before
creating a release version. It can be a good idea to fix the bugs, merge into
master and then create a new release candidate to test again.

## Create a release version

When bugs are fixed follow in instructions in the
[version documentation for release](./version#release) and run
[`yarn version:release`](./cli#version-release).

## Deploy to production

Follow in instructions in [deploy documentation](./deploy) and run
[`yarn remote:deploy -s production -t <NEW_RELEASE_VERSION> -m`](./cli#remote:deploy)

## Post release tasks

> 1. Release the updated user manual
> 2. Inform users of the new release
