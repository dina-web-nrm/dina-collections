describe('Home', () => {
  before(() => {
    cy.visit('/')
  })

  it('has expected content', () => {
    cy.getByTestId('logo')
      .should('exist')
      .should('have.attr', 'src')
      .should('match', /^\/static\/media\/logo\..+\.png$/)

    cy.title().should('eq', 'DINA Collection Management System')

    cy.getByTestId('home-header').should('have.text', 'Collections UI')

    cy.getByTestId('home-descriptions')
      .children()
      .should('exist')
      .and('have.length', 2)

    cy.getByTestId('home-readmore-button').shouldHaveHref('#footer')

    cy.getByTestId('home-login-button').shouldHaveHref('/login')
  })
})
