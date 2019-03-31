Cypress.Commands.add('getByElementName', (name, options) => {
  return cy.get(`[name="${name}"]`, options)
})

Cypress.Commands.add('getByTestIds', (testIds, options) => {
  const selector = testIds
    .map(testId => {
      return `[data-testid="${testId}"]`
    })
    .join(' ')

  return cy.get(selector, options)
})

Cypress.Commands.add('getDropdownInputByText', (text, options) => {
  cy.log('getDropdownInputByText')
  return cy
    .getByText(text, options)
    .click({ log: false })
    .prev({ log: false })
})

Cypress.Commands.add('getDropdownOptionByText', (text, options) => {
  return cy.get('[role="listbox"].visible', options).within(() => {
    cy.getByText(text, options)
  })
})

Cypress.Commands.add('getDropdownSearchByName', (name, options) => {
  return cy.get(`[name="${name}"] input`, options)
})

Cypress.Commands.add('getInputByLabelFor', (htmlFor, options) => {
  cy.log('getInputByLabelFor')
  return cy
    .get(`label[for="${htmlFor}"]`, options)
    .parent({ log: false })
    .within({ log: false }, () => {
      return cy.get('input')
    })
})

Cypress.Commands.add('getInputByLabelText', (label, options) => {
  cy.log('getInputByLabelText')
  return cy
    .getByText(label, options)
    .parent({ log: false })
    .parent({ log: false })
    .within({ log: false }, () => {
      return cy.get('input')
    })
})

Cypress.Commands.add('getInputByParentTestId', (testId, options) => {
  return cy.get(`[data-testid="${testId}"] input`, options)
})

Cypress.Commands.add(
  'queryMultipleSearchDropdownOptionByText',
  (text, options) => {
    return cy.get('[role="listbox"].visible', options).within(() => {
      cy.queryByText(text, options)
    })
  }
)

Cypress.Commands.add('quickQueryByTestId', (testId, options = {}) => {
  return cy.queryByTestId(testId, { timeout: 4000, ...options })
})

Cypress.Commands.add('quickQueryByText', (text, options = {}) => {
  return cy.queryByText(text, { timeout: 4000, ...options })
})
