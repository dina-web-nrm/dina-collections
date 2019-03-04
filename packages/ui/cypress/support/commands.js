// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-testing-library/add-commands'

Cypress.Commands.add('login', (username, password) => {
  if (username && password) {
    cy.request({
      body: {
        client_id: 'dina-rest',
        grant_type: 'password',
        password,
        username,
      },
      method: 'POST',
      url: '/auth/realms/dina/protocol/openid-connect/token',
    })
  } else {
    cy.log('Did not receive username and password, assuming auth is disabled')
  }
})

Cypress.Commands.add(
  'shouldHaveHref',
  {
    prevSubject: true,
  },
  (subject, href) => {
    cy.wrap(subject).should('have.attr', 'href', href)
  }
)
