export default () =>
  describe('search', () => {
    before(() => {
      cy.visit('/app/agents')
      cy.get('[data-testid="searchMenuItem"', {
        log: false,
        timeout: 20000,
      }).click()
    })

    it('search agents by full name and agent type', () => {
      cy.log('searchs by agent full name')
      cy.getByElementName('fullName').type('John Doe')
      cy.getByTestId('searchButton')
        .click()
        .shouldFinishLoading()
      cy.get('[data-testid="numberOfListItems"', {
        log: false,
        timeout: 20000,
      }).should('have.text', '2')
      cy.getByTestId('clearAllFiltersButton').click()

      cy.log('searchs by agent type')
      cy.getByElementName('agentType').click()
      cy.selectDropdownOptionByText('Other')
      cy.getByTestId('searchButton')
        .click()
        .shouldFinishLoading()
      cy.get('[data-testid="numberOfListItems"', {
        log: false,
        timeout: 20000,
      }).should('have.text', '0')

      cy.getByElementName('agentType').click()
      cy.selectDropdownOptionByText('Person')
      cy.getByTestId('searchButton')
        .click()
        .shouldFinishLoading()
      cy.get('[data-testid="numberOfListItems"', {
        log: false,
        timeout: 20000,
      }).should('have.text', '12')

      cy.log('searchs by agent full name and agent type')
      cy.getByElementName('fullName').type('John Doe')
      cy.getByTestId('searchButton')
        .click()
        .shouldFinishLoading()
      cy.get('[data-testid="numberOfListItems"', {
        log: false,
        timeout: 20000,
      }).should('have.text', '2')

      cy.getByTestId('clearAllFiltersButton').click()
    })
  })
