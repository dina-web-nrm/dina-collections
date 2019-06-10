export default () =>
  describe('delete', () => {
    before(() => {
      cy.resetDevelopmentSqlDb()
      cy.resetSearchNormalizedAgentIndex()
    })

    beforeEach(() => {
      cy.visit('/app/agents')
      cy.get('[data-testid="infinityTableHeader"]', {
        log: false,
        timeout: 60000,
      })
    })

    it('delete agent', () => {
      cy.getByText('Anders Sparrman')
        .parent()
        .should('have.attr', 'data-isfocused', 'yes')
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('deleteButton').click()
      cy.getByTestId('confirmDeleteButton').click()

      cy.getByText('The record was deleted')
      cy.url()
        .should('include', 'table')
        .should('not.include', 'edit')
      cy.getByText('Carl Peter Thunberg')
        .parent()
        .should('have.attr', 'data-isfocused', 'yes')
      cy.quickQueryByText('Anders Sparrman').should('not.exist')
    })
  })
