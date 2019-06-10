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
    cy.getByText('Development')
  })

  it('has expected number of links', () => {
    const links = [
      { expectedLength: 2, id: 'footerSite' },
      { expectedLength: 3, id: 'footerDocument' },
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
    cy.getByTestId('footerDinaWiki').shouldHaveHref('wiki', {
      exact: false,
    })
    cy.getByTestId('userManualLink').shouldHaveHref(
      '/images/DINA Collections User Manual',
      {
        exact: false,
      }
    )

    cy.getByTestId('userManualLink').shouldHaveHref('.pdf', {
      exact: false,
    })

    cy.getByTestId('footerDocumentDataModel').shouldHaveHref('/dataModelDocs')
    cy.getByTestId('footerDinaWebGithub').shouldHaveHref(
      'https://github.com/DINA-Web'
    )
    cy.getByTestId('footerDinaCollectionsGithub').shouldHaveHref(
      'https://github.com/dina-web-nrm/dina-collections'
    )
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
