---
id: version
title: Version
sidebar_label: Version
---

## Overview

A version is a snapshot of the application code and consists of a git tag and
docker images for all services created from the mono repo. The version number is
derived from the version in the root
[package.json](https://docs.npmjs.com/files/package.json#version). The git tag
and docker tags is the version in package.json suffixed with a v.

The version number in package.json contains 3 numbers separated by `.` ex
`0.19.0`. According to [semver](https://semver.org/) the first number is called
major, second minor and third patch. We are not strictly following semver since
it makes less sense for an application compared to a library. Our current
convention is that the we keep the major 0 until we we reach a production stage
where users rely on our system, use the minor number for changes in the data
model that requires migrations and path for the rest (bug fixes and features
that dont affect the data model)

To create a new version a developer can use cli scripts depending on with type
of version to create.

| Version type      | CLI                                             |
| ----------------- | ----------------------------------------------- |
| release           | [`yarn version:release`](./cli#version-release) |
| release candidate | [`yarn version:rc`](./cli#version-rc)           |
| test              | [`yarn version:test`](./cli#version-test)       |

The cli scripts will run tests related to the state of the current branch, ask
the user for the name of the new version, update the version in root
package.json, create a git tag based on the new version and then push the git
tag. The ci will then run tests and if the tests are passing build corresponding
docker images and push them to docker hub making then available for deployment.

## Version types

### Release

A release version is used when new code should be available in production.
Usually it follows a release candidate version but can also be created without a
release candidate. To create a release version the script
[`yarn version:release`](./cli#version-release) is used and it has to be run
from the master branch and the master branch has to be in sync with origin
master. The master branch also has be be clean with no uncomitted changes. If
above is not true the script will throw an error and no version will be created.

The script will then ask the user for the new version. In the previous version
is not a release candidate the following convention should be used: if the new
release contains no changes to the data model the patch number (the last number)
should be increased (no new migrations). If the data model contains changes then
the minor number (the second number) should be increased. If the previous
version is a release candidate the new version should be the same but without
the -rc suffix.

Version examples with corresponding tag in parentheses:

| Previous version       | With update datamodel | Without update datamodel |
| ---------------------- | --------------------- | ------------------------ |
| 0.18.2 (v0.18.2)       | 0.19.0 (v0.19.0)      | 0.18.3 (v0.18.3)         |
| 0.18.2-rc (v0.18.2-rc) | 0.18.2 (v0.18.2)      | 0.18.2 (v0.18.2)         |

After the script is provided with the new version it will update root
package.json, update the
[CHANGELOG](https://github.com/DINA-Web-nrm/dina-collections/blob/master/CHANGELOG.md),
create a corresponding git tag and push the git tag. Then ci will run the tests
and build images and push the images to docker hub.

### Release candidate

A release candidate (rc) can be created before creating a release. To purpose is
to make new features available for testing in a stage environment. Ideally the
difference between a rc release and the upcoming should be none but it can
potentially include bug fixes that are discovered when testing on stage.

To create an rc the script [`yarn version:rc`](./cli#version-rc) is used and it
has to be run from the master branch and the master branch has to be in sync
with origin master. The master branch has be be clean with no uncomitted
changes. As when creating a release version the user will be prompted for the
version name that should be an increment of the current version. Versioning for
rc follow the same conventions as for the version but with -rc suffix.

Version examples with corresponding tag in parentheses:

| Current version  | With update datamodel | Without update datamodel |
| ---------------- | --------------------- | ------------------------ |
| 0.18.2 (v0.18.2) | 0.19.0-rc (v0.18.2)   | 0.18.3-rc (v0.18.3-rc)   |

As for the release version the script will update root package.json, update the
[CHANGELOG](https://github.com/DINA-Web/dina-collections/blob/master/CHANGELOG.md),
create a corresponding git tag and push the git tag. Then ci will run the tests
and build images and push the images to docker hub. Even if the changelog is
updated the upcoming release version will remove the rc from the changelog.

### Test

A test version can be created when a developer wants run the code dockerized or
want to make a new feature available for the product team to test. Since the ci
run all tests including e2e tests a developer can create a test version to run
these tests.

A test version can be created from any branch by running
[`yarn version:test`](./cli#version-test). This script will prompt the user for
the name of the new version. The tag name should be suffixed with
-test-[something] The text after test could be anything but its recommended to
either use the developer name or something that describes what is tested. When
creating a test version the current version number is not incremented as for the
release and release candidate. If multiple test tags are created for the same
branch an incrementing number can be suffixed.

Version examples (tag omitted).

| Current version | With feature name        | With developer name | With developer name nr 2 |
| --------------- | ------------------------ | ------------------- | ------------------------ |
| 0.18.2          | 0.18.2-test-new-dropdown | 0.18.3-test-ida     | 0.18.3-test-ida-2        |

When creating a git tag the root package.json version is updated with the test
version name. This should not be included in the git history so the test script
removes this commit after the git tag is pushed.
