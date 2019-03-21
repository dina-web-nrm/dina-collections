export default () =>
  describe('delete', () => {
    beforeEach(() => {
      cy.goToRoute('/app/specimens/mammals/search')
      cy.get('[data-testid="infiniteTableHeader"]', {
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
        .should('include', 'search')
        .should('not.include', 'edit')
      cy.quickQueryByText('985729').should('not.exist')
    })
  })
