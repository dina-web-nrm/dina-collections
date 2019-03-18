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
