describe('App', () => {
  context('without login', () => {
    it('redirect to login', () => {
      cy.visit('/app')
      cy.url().should('include', '/login')
    })
  })

  context('with login', () => {
    before(() => {
      cy.loginWithForm('test', 'password')
    })

    it('has header', () => {
      cy.get('h1')
        .should('exist')
        .getByText('Welcome Test Test! What would you like to do?')
    })

    it('has register mammal link', () => {
      cy.getByTestId('start-register-mammal')
        .should('exist')
        .shouldHaveHref('/app/specimens/mammals/create/sections/0')
    })

    it('has find mammals link', () => {
      cy.getByTestId('start-find-mammals')
        .should('exist')
        .shouldHaveHref('/app/specimens/mammals')
    })

    it('has dina-support link', () => {
      cy.getByTestId('start-support-link')
        .should('exist')
        .shouldHaveHref('mailto:support-dina@nrm.se')
    })

    it('has changelog link', () => {
      cy.getByTestId('start-changelog-link')
        .should('exist')
        .shouldHaveHref(
          'https://github.com/DINA-Web/dina-collections/blob/master/CHANGELOG.md'
        )
        .should('have.attr', 'target', '_blank')
    })
  })
})
