export default () =>
  describe('form crud', () => {
    describe('create', () => {
      beforeEach(() => {
        cy.goToRoute('/app/agents?mainColumn=create')
        cy.get('[data-testid="agentRoot"]', { log: false, timeout: 20000 })
      })

      it('creates new agent', () => {
        cy.getByElementName('agentType').check('organization', { force: true })
        cy.getByElementName('fullName').type('agentName')
        cy.getByElementName('disambiguatingDescription').type(Date.now())

        cy.url().should('not.include', 'itemId')
        cy.getByText('Save').click()
        cy.url()
          .should('include', 'itemId')
          .should('include', 'mainColumn=edit')
      })
    })
  })
