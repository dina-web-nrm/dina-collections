context('Home', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has logo', () => {
    cy.getByTestId('logo')
      .should('exist')
      .should('have.attr', 'src')
      .should('match', /^\/static\/media\/logo\..+\.png$/)
  })
})
