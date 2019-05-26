export default () =>
  describe('delete', () => {
    before(() => {
      cy.resetDevelopmentSqlDb()
      cy.resetElasticSpecimenIndex()
    })

    beforeEach(() => {
      cy.visit('/app/specimens/mammals?mainColumn=table')
      cy.get('[data-testid="infinityTableHeader"]', {
        log: false,
        timeout: 60000,
      })
    })

    it('deletes record', () => {
      cy.getByText('985729').click()
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('deleteButton').click()
      cy.getByTestId('confirmDeleteButton').click()
      cy.getByText('The specimen was deleted')
      cy.url()
        .should('include', 'mainColumn=table')
        .should('not.include', 'edit')
      // there's a setTimeout before the table reloads so we have to wait
      cy.wait(3000) // eslint-disable-line cypress/no-unnecessary-waiting
      cy.quickQueryByText('985729').should('not.exist')
    })
  })
