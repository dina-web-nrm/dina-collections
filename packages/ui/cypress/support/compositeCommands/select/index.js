import '../../get'

Cypress.Commands.add('selectDropdownOptionByText', (optionText, options) => {
  cy.log('selectDropdownOptionByText')
  cy.getDropdownOptionByText(optionText, options).click()
  // check text exists after click, i.e. has been selected, but note that you
  // need to make sure this check is done in an appropriate scope, if the text
  // can exist elsewhere in the DOM
  cy.getByText(optionText)
})

Cypress.Commands.add(
  'selectMultipleSearchDropdownOptionByText',
  (optionText, options) => {
    cy.log('selectMultipleSearchDropdownOptionByText')
    cy.getDropdownOptionByText(optionText, options).click()
    // ensure option is no longer in list of options, i.e. has been selected
    cy.queryMultipleSearchDropdownOptionByText(optionText, {
      timeout: 4000,
      ...options,
    }).should('not.exist')
  }
)
