export default () =>
  describe('delete', () => {
    before(() => {
      cy.resetDevelopmentSqlDb()
      cy.resetSearchSpecimenIndex()
    })

    beforeEach(() => {
      cy.visit('/app/specimens/mammals?mainColumn=table')
      cy.get('[data-testid="infinityTableHeader"]', {
        log: false,
        timeout: 60000,
      })
    })

    it(`
      deletes the last record in table and focuses the previous;
      deletes the first record in table and focuses the next;
    `, () => {
      cy.log('deletes the last record in table and focuses the previous')
      cy.get('[data-testid="tableScrollContainer"]')
        .as('table')
        .scrollTo(0, 2000, { duration: 500 })
      cy.getByText('500001')
        .click()
        .parent()
        .should('have.attr', 'data-isfocused', 'yes')
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('deleteButton').click()
      cy.getByTestId('confirmDeleteButton').click()

      cy.getByText('The record was deleted')
      cy.url()
        .should('include', 'mainColumn=table')
        .should('not.include', 'edit')
      cy.getByText('628009')
        .parent()
        .should('have.attr', 'data-isfocused', 'yes')
      cy.quickQueryByText('500001').should('not.exist')

      cy.log('deletes the first record in table and focuses the next')
      cy.get('@table').scrollTo(0, 0, { duration: 500 })
      cy.getByText('621445')
        .click()
        .parent()
        .should('have.attr', 'data-isfocused', 'yes')
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('deleteButton').click()
      cy.getByTestId('confirmDeleteButton').click()

      cy.getByText('The record was deleted')
      cy.url()
        .should('include', 'mainColumn=table')
        .should('not.include', 'edit')
      cy.getByText('620285')
        .parent()
        .should('have.attr', 'data-isfocused', 'yes')
      cy.quickQueryByText('621445').should('not.exist')
    })
  })
