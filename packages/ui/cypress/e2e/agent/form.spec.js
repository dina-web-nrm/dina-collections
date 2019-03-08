describe('Agent', () => {
  context('agent form create agent', () => {
    it('has side bar header', () => {
      cy.loginWithForm('test', 'password').wait(2000)
      cy.visit('/app/agents?filterColumn=&mainColumn=create')

      cy.getByText('Agent').should('exist')
    })

    it('has form header', () => {
      cy.get('h2')
        .should('exist')
        .contains('Agent')

      cy.get('h2')
        .should('exist')
        .contains('Agent')
    })

    it('has default value in redios group', () => {
      cy.get('[type="radio"]').should('exist')
    })
  })
})
