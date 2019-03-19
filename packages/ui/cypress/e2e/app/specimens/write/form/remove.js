export default () =>
  describe('form crud', () => {
    describe('delete', () => {
      beforeEach(() => {
        cy.goToRoute('/app/specimens/mammals/16/edit/sections/0')
      })

      it('deletes record', () => {
        cy.getByTestId('deleteButton').click()
        cy.getByTestId('confirmDeleteButton').click()
        cy.getByText('The specimen was deleted')
        cy.url()
          .should('include', 'search')
          .should('not.include', 'edit')
      })
    })
  })
