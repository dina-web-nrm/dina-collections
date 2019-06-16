export default () =>
  describe('tree', () => {
    before(() => {
      cy.resetSearchPlaceIndex()
    })

    describe('starting in tree', () => {
      it('does', () => {
        cy.visit('/app/localities?mainColumn=tree')
        cy.get('[data-testid=tree] .row').should('have.length', 1)

        cy.getByTestId('expandIcon').click()
        cy.get('[data-testid=tree] .row').should('have.length', 5)

        cy.getByText('Europe').click()
      })
    })
  })
