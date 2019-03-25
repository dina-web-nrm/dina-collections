describe('Footer', () => {
  before(() => {
    cy.visit('/')
  })

  it('has three columns', () => {
    cy.getByTestId('footerContent')
      .children()
      .and('have.length', 3)

    cy.getByText('Site')
    cy.getByText('Documentation')
    cy.getByText('Developer')
  })

  it('has expected number of links', () => {
    const links = [
      { expectedLength: 3, id: 'footerSite' },
      { expectedLength: 2, id: 'footerDocument' },
      { expectedLength: 5, id: 'footerDeveloper' },
    ]

    cy.wrap(links).each(({ id, expectedLength }) => {
      cy.getByTestId(id)
        .children()
        .and('have.length', expectedLength)
    })
  })

  it('has expected links', () => {
    cy.getByTestId('footerStart').shouldHaveHref('/')
    cy.getByTestId('footerLogin').shouldHaveHref('/login')
    cy.getByTestId('footerDataModel').shouldHaveHref('/dataModelDocs')
    cy.getByTestId('footerDinaWiki').shouldHaveHref('wiki', {
      exact: false,
    })
    cy.getByTestId('footerDocumentDataModel').shouldHaveHref('/dataModelDocs')
    cy.getByTestId('footerDinaWebGithub').shouldHaveHref('github', {
      exact: false,
    })
    cy.getByTestId('footerDinaCollectionsGithub').shouldHaveHref('github', {
      exact: false,
    })
    cy.getByTestId('footerDinaDeveloperDocs').shouldHaveHref('docs', {
      exact: false,
    })

    cy.getByTestId('footerDinaStyle').shouldHaveHref('style', {
      exact: false,
    })
    cy.getByTestId('footerDinaApiDocs').shouldHaveHref('api', {
      exact: false,
    })
  })
})
