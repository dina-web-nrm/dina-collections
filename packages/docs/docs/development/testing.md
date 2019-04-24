---
id: testing
title: Testing
sidebar_label: Testing
---

We have unit, integration and end-to-end tests, but since the project has been
in a prototyping phase with rapid major iterations and priority on pushing new
features fast, the coverage is not 100%. The tests should, however, catch
regression errors in the key flows (API communication, login, registration of
new specimen, search among specimens).

## Unit and integration tests

We use [Jest](https://jestjs.io/) to run unit and integration tests.

For unit tests in the `ui` package, refer to Create React App's
[testing documentation](https://facebook.github.io/create-react-app/docs/running-tests).

## React component tests

Please refer to Create React App's documentation on
[component testing](https://facebook.github.io/create-react-app/docs/running-tests#testing-components)
and
[react-testing-library](https://github.com/kentcdodds/react-testing-library).

## End-to-end (e2e) tests

We use [Cypress](https://cypress.io/) for e2e tests. You can see our existing
e2e tests in action in our
[Cypress Dashboard](https://dashboard.cypress.io/#/projects/btwnu2/runs)
(requires logging in with GitHub or Google). For a general description of what
the dashboard shows, go
[here](https://docs.cypress.io/guides/core-concepts/dashboard-service.html#What-is-recorded).

Here are some useful links to get started writing Cypress tests:

- [Cypress API](https://docs.cypress.io/api/api/table-of-contents.html)
- [Cypress commands sorted by purpose](https://example.cypress.io/)
- [Example tests](https://github.com/cypress-io/cypress/tree/develop/packages/example/cypress/integration/examples)
- [Best practices](https://docs.cypress.io/guides/references/best-practices.html)
- [Tutorials](https://docs.cypress.io/examples/examples/tutorials.html)

We also use
[cypress-testing-library](https://github.com/kentcdodds/cypress-testing-library)
to enable the same kind of selectors as in
[react-testing-library](https://github.com/kentcdodds/react-testing-library)
(they are both based on
[dom-testing-library](https://github.com/kentcdodds/dom-testing-library)).
