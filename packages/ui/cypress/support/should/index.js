Cypress.Commands.add('errorClassShouldNotExist', (options = {}) => {
  cy.get('.error', { timeout: 2000, ...options }).should('not.exist')
})

Cypress.Commands.add(
  'shouldFinishLoading',
  {
    prevSubject: true,
  },
  (subject, options = {}) => {
    cy.wrap(subject, {
      timeout: 20000,
      ...options,
    }).should('not.have.class', 'loading')
  }
)

Cypress.Commands.add(
  'shouldBeLoadingAndFinishLoading',
  {
    prevSubject: true,
  },
  (subject, options = {}) => {
    cy.wrap(subject, options).should('have.class', 'loading')
    cy.wrap(subject, {
      timeout: 20000,
      ...options,
    }).should('not.have.class', 'loading')
  }
)

Cypress.Commands.add(
  'shouldHaveName',
  {
    prevSubject: true,
  },
  (subject, name) => {
    cy.wrap(subject).should('have.attr', 'name', name)
  }
)

Cypress.Commands.add(
  'shouldHaveTargetBlank',
  {
    prevSubject: true,
  },
  subject => {
    cy.wrap(subject).should('have.attr', 'target', '_blank')
  }
)

Cypress.Commands.add(
  'shouldHaveHref',
  {
    prevSubject: true,
  },
  (subject, href, { exact = true, targetBlank = false } = {}) => {
    if (exact) {
      cy.wrap(subject).should('have.attr', 'href', href)
    } else {
      cy.wrap(subject)
        .should('have.attr', 'href')
        .should('include', href)
    }

    if (targetBlank) {
      cy.wrap(subject).shouldHaveTargetBlank()
    }
  }
)
