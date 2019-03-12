describe('Footer', () => {
  before(() => {
    cy.visit('/')
  })

  it('has three columns', () => {
    cy.getByTestId('footer-content')
      .children()
      .should('exist')
      .and('have.length', 3)

    cy.getByText('Site').should('exist')
    cy.getByText('Documentation').should('exist')
    cy.getByText('Developer').should('exist')
  })

  it('has expected number of links', () => {
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

  it('has expected links', () => {
    cy.getByTestId('footer-start').shouldHaveHref('/')
    cy.getByTestId('footer-login').shouldHaveHref('/login')
    cy.getByTestId('footer-data-model').shouldHaveHref('/docs')
    cy.getByTestId('footer-dina-wiki').shouldHaveHref(
      'https://www.dina-project.net/wiki/Welcome_to_the_DINA_project!'
    )
    cy.getByTestId('footer-document-data-model').shouldHaveHref('/docs')
    cy.getByTestId('footer-dina-web-github').shouldHaveHref(
      'https://github.com/DINA-Web'
    )
    cy.getByTestId('footer-dina-collections-github').shouldHaveHref(
      'https://github.com/DINA-Web/dina-collections'
    )
    cy.getByTestId('footer-dina-style').shouldHaveHref(
      'https://dina-style.nrm.se/'
    )
    cy.getByTestId('footer-dina-api-docs').shouldHaveHref(
      'https://dina-api.nrm.se/docs'
    )
    cy.getByTestId('footer-test-coverage').shouldHaveHref(
      '/coverage/index.html'
    )
  })
})
