export default () =>
  describe('table', () => {
    beforeEach(() => {
      cy.goToRoute('/app/specimens/mammals/search')
      cy.get('[data-testid="infiniteTableHeader"', {
        log: false,
        timeout: 60000,
      })
    })

    it('scrolls to load more specimens, sorts table and keeps focus between form and table', () => {
      cy.log('Check first specimen and that the last is not visible')
      cy.get(
        '[data-testid="infiniteTable"] [data-testid="infiniteTableRow1"]'
      ).should('contain', '621445')
      cy.queryByText('500001').should('not.exist')

      cy.log('check that switching between form and tab works')
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('formSectionNavigationHeader').should('contain', '621445')
      cy.getByTestId('formSectionNavigationSubheader').should(
        'contain',
        'Gorilla beringei'
      )
      cy.getByTestId('tableTabMenuItem').click()

      cy.log('Scroll to bottom of table and check last is visible')
      cy.get('[data-testid="resultTableScrollContainer"]')
        .as('table')
        .scrollTo(0, 2000, { duration: 500 })
      cy.get(
        '[data-testid="infiniteTable"] [data-testid="infiniteTableRow16"]',
        {
          timeout: 20000,
        }
      ).should('contain', '500001')

      cy.log('check again that switching between form and tab works')
      cy.getByText('500001').click()
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('formSectionNavigationHeader').should('contain', '500001')
      cy.getByTestId('formSectionNavigationSubheader').should(
        'contain',
        'Mustela erminea'
      )
      cy.getByTestId('tableTabMenuItem').click()

      cy.log('Sort on catalog number and check 500001 is now on top')
      cy.get(
        '[data-testid="infiniteTableHeader-identifiersCatalogNumber"]'
      ).click()
      cy.get('@table').scrollTo('topLeft', { duration: 500 })
      cy.get('[data-testid="infiniteTable"] .row:first').should(
        'contain',
        '50000'
      )

      cy.log('Sort again and check 500001 is now on bottom')
      cy.get(
        '[data-testid="infiniteTableHeader-identifiersCatalogNumber"]'
      ).click()
      cy.get('@table').scrollTo(0, 2000, { duration: 500 })
      cy.get('[data-testid="infiniteTable"] .row:last').should(
        'contain',
        'Mustela erminea'
      )

      cy.log('Sort on taxon name')
      cy.get(
        '[data-testid="infiniteTableHeader-taxonomyCuratorialName"]'
      ).click()
      cy.get('@table').scrollTo('topLeft', { duration: 500 })
      cy.get('[data-testid="infiniteTable"] .row:first').should(
        'contain',
        'Alouatta caraya'
      )
      cy.get('@table').scrollTo(0, 2000, { duration: 500 })
      cy.get('[data-testid="infiniteTable"] .row:last').should(
        'contain',
        'Ursus arctos'
      )
    })

    it('uses keyboard shortcuts and record number input to walk in table and open/view specimen', () => {
      cy.get('[data-isfocused="yes"]').should('contain', '621445')
      cy.get('body').type('{downarrow}{downarrow}{downarrow}')
      cy.get('[data-isfocused="yes"]').should('contain', '587520')
      cy.get('body').type('{uparrow}')
      cy.get('[data-isfocused="yes"]').should('contain', '590325')

      cy.get('body').type(' ')
      cy.url().should('include', '/edit/')
      cy.getByText('590325')
      cy.getByText('Mus musculoides')

      cy.getInputByTestId('currentTableRowInput')
        .clear()
        .type('16')
      cy.getByText('500001')
      cy.getByText('Mustela erminea')

      cy.getByTestId('tableTabMenuItem').click()
      cy.get('[data-isfocused="yes"]').should('contain', '500001')
    })
  })
