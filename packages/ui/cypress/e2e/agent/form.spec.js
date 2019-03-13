describe('Agent', () => {
  describe('agent form create agent', () => {
    before(() => {
      cy.login()
      cy.visit('/app/agents?mainColumn=create')
    })

    it('creates new agent with all fields filled', () => {
      cy.getByText('Agent').should('exist')
      cy.get('[name="agentType"]').check('organization', { force: true })
      cy.get('[name="fullName"]')
        .type('agentName')
        .should('exist')
      cy.get('[name="disambiguatingDescription"]')
        .type(Date.now())
        .should('exist')

      cy.url().should('not.include', 'itemId')
      cy.getByText('Save').click()
      cy.url()
        .should('include', 'itemId')
        .should('include', 'mainColumn=edit')
    })
  })
})
