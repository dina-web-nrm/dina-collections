describe('Footer', () => {
  before(() => {
    cy.visit('/')
  })

  context('with three columns', () => {
    it('has three columns', () => {
      cy.getByTestId('footer-content')
        .children()
        .should('exist')
        .and('have.length', 3)
    })

    it('has site', () => {
      cy.getByTestId('footer-content')
        .getByText('Site')
        .should('exist')
    })

    it('has documentation', () => {
      cy.getByTestId('footer-content')
        .getByText('Documentation')
        .should('exist')
    })

    it('has developer', () => {
      cy.getByTestId('footer-content')
        .getByText('Developer')
        .should('exist')
    })
  })

  context('with links', () => {
    it('has links', () => {
      const links = [
        { expectedLength: 3, id: 'footer-site' },
        { expectedLength: 2, id: 'footer-document' },
        { expectedLength: 5, id: 'footer-developer' },
      ]

      cy.wrap(links).each(({ id, expectedLength }) => {
        cy.getByTestId(id)
          .children()
          .should('exist')
          .and('have.length', expectedLength)
      })
    })
  })

  context('with site', () => {
    it('has link to start', () => {
      cy.getByTestId('footer-start').shouldHaveHref('/')
    })

    it('has link to login', () => {
      cy.getByTestId('footer-login').shouldHaveHref('/login')
    })

    it('has link to docs', () => {
      cy.getByTestId('footer-data-model').shouldHaveHref('/docs')
    })
  })

  context('with documentation', () => {
    it('has link to dina wiki', () => {
      cy.getByTestId('footer-dina-wiki').shouldHaveHref(
        'https://www.dina-project.net/wiki/Welcome_to_the_DINA_project!'
      )
    })

    it('has link to docs', () => {
      cy.getByTestId('footer-document-data-model').shouldHaveHref('/docs')
    })
  })

  context('with developer', () => {
    it('has link to dian web github', () => {
      cy.getByTestId('footer-dina-web-github').shouldHaveHref(
        'https://github.com/DINA-Web'
      )
    })

    it('has link to dina collections github', () => {
      cy.getByTestId('footer-dina-collections-github').shouldHaveHref(
        'https://github.com/DINA-Web/dina-collections'
      )
    })

    it('has link to dina style', () => {
      cy.getByTestId('footer-dina-style').shouldHaveHref(
        'https://dina-style.nrm.se/'
      )
    })

    it('has link to dina api docs', () => {
      cy.getByTestId('footer-dina-api-docs').shouldHaveHref(
        'https://dina-api.nrm.se/docs'
      )
    })

    it('has link to test coverage', () => {
      cy.getByTestId('footer-test-coverage').shouldHaveHref(
        '/coverage/index.html'
      )
    })
  })
})
