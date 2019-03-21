Cypress.Commands.add('getByElementName', (name, options) => {
  return cy.get(`[name="${name}"]`, options)
})

Cypress.Commands.add('getDropdownInputByName', (name, options) => {
  return cy.get(`[name="${name}"] input`, options)
})

Cypress.Commands.add(
  'getDropdownInputByPlaceholder',
  (placeholder, options) => {
    cy.log('getDropdownInputByPlaceholder')
    return cy
      .getByText(placeholder, options)
      .click({ log: false })
      .prev({ log: false })
  }
)

Cypress.Commands.add('getDropdownOptionByText', (text, options) => {
  return cy.get('[role="listbox"].visible', options).within(() => {
    cy.getByText(text, options)
  })
})

Cypress.Commands.add('getInputByFieldLabel', (label, options) => {
  cy.log('getInputByFieldLabel')
  return cy
    .getByText(label, options)
    .parent({ log: false })
    .parent({ log: false })
    .within({ log: false }, () => {
      return cy.get('input')
    })
})

Cypress.Commands.add('getInputByTestId', (testId, options) => {
  return cy.get(`[data-testid="${testId}"] input`, options)
})

Cypress.Commands.add('quickQueryByText', (text, options = {}) => {
  return cy.queryByText(text, { timeout: 4000, ...options })
})
