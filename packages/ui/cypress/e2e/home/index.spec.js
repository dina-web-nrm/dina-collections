context('Home', () => {
  before(() => {
    cy.visit('/')
  })

  it('has logo', () => {
    cy.getByTestId('logo')
      .should('exist')
      .should('have.attr', 'src')
      .should('match', /^\/static\/media\/logo\..+\.png$/)
  })

  it('has title', () => {
    cy.title().should('eq', 'DINA Collection Management System')
  })

  it('has header', () => {
    cy.getByTestId('home-header').should('have.text', 'Collections UI')
  })

  it('has descriptions', () => {
    cy.getByTestId('home-descriptions')
      .children()
      .should('exist')
      .and('have.length', 2)
  })

  it('has link to footer', () => {
    cy.getByTestId('home-readmore-button').shouldHaveHref('#footer')
  })

  it('has link to login', () => {
    cy.getByTestId('home-login-button').shouldHaveHref('/login')
  })
})
