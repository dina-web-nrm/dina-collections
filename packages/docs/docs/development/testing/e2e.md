---
id: e2e
title: End-to-end (e2e) testing
sidebar_label: End-to-end testing
---

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
