Cypress.Commands.add('getByElementName', name => {
  return cy.get(`[name="${name}"]`)
})

Cypress.Commands.add('getInputByFieldLabel', label => {
  return cy
    .getByText(label)
    .parent({ log: false })
    .parent({ log: false })
    .within({ log: false }, () => {
      return cy.get('input')
    })
})
