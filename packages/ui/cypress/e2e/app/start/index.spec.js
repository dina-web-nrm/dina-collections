describe('Start', () => {
  describe('without login', () => {
    it('redirect to login', () => {
      cy.visit('/app')
        .url()
        .should('include', '/login')
    })
  })

  describe('with login', () => {
    before(() => {
      cy.login()
      cy.goToRoute('/app')
    })

    it('has header and links', () => {
      cy.getByText('Welcome Test Test! What would you like to do?').should(
        'exist'
      )

      cy.getByTestId('start-register-mammal').shouldHaveHref(
        '/app/specimens/mammals?mainColumn=create&sectionId=0'
      )

      cy.getByTestId('start-find-mammals').shouldHaveHref(
        '/app/specimens/mammals'
      )

      cy.getByTestId('start-support-link').shouldHaveHref(
        'mailto:support-dina@nrm.se'
      )

      cy.getByTestId('start-changelog-link')
        .shouldHaveHref(
          'https://github.com/dina-web-nrm/dina-collections/blob/master/CHANGELOG.md'
        )
        .shouldHaveTargetBlank()
    })
  })
})
