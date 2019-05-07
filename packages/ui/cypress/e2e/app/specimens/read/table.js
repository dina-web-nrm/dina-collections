export default () =>
  describe('table', () => {
    beforeEach(() => {
      cy.visit('/app/specimens/mammals')
      cy.get('[data-testid="infinityTableHeader"', {
        log: false,
        timeout: 60000,
      })
    })

    it('scrolls to load more specimens, sorts table and keeps focus between form and table', () => {
      cy.log('Check first specimen and that the last is not visible')
      cy.get(
        '[data-testid="infinityTable"] [data-testid="infinityTableRow1"]'
      ).should('contain', '621445')
      cy.quickQueryByText('500001').should('not.exist')

      cy.log('check that switching between form and tab works')
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('formSectionNavigationHeader').should('contain', '621445')
      cy.getByTestId('formSectionNavigationSubheader').should(
        'contain',
        'Gorilla beringei'
      )
      cy.getByTestId('tableTabMenuItem').click()

      cy.log('Scroll to bottom of table and check last is visible')
      cy.get('[data-testid="tableScrollContainer"]')
        .as('table')
        .scrollTo(0, 2000, { duration: 500 })
      cy.get(
        '[data-testid="infinityTable"] [data-testid="infinityTableRow16"]',
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
        '[data-testid="infinityTableHeader-identifiersCatalogNumber"]'
      ).click()
      cy.get('@table').scrollTo('topLeft', { duration: 500 })
      cy.get('[data-testid="infinityTable"] .row:first').should(
        'contain',
        '50000'
      )

      cy.log('Sort again and check 500001 is now on bottom')
      cy.get(
        '[data-testid="infinityTableHeader-identifiersCatalogNumber"]'
      ).click()
      cy.get('@table').scrollTo(0, 2000, { duration: 500 })
      cy.get('[data-testid="infinityTable"] .row:last').should(
        'contain',
        'Mustela erminea'
      )

      cy.log('Sort on taxon name')
      cy.get(
        '[data-testid="infinityTableHeader-taxonomyCuratorialName"]'
      ).click()
      cy.get('@table').scrollTo('topLeft', { duration: 500 })
      cy.get('[data-testid="infinityTable"] .row:first').should(
        'contain',
        'Alouatta caraya'
      )
      cy.get('@table').scrollTo(0, 2000, { duration: 500 })
      cy.get('[data-testid="infinityTable"] .row:last').should(
        'contain',
        'Ursus arctos'
      )

      cy.log('Table header scrolls horizontally')
      cy.getByText('Catalog no.')
      cy.get('@table').scrollTo(500, 2000, { duration: 500 })
      cy.getByText('Catalog no.').should('not.be.visible')
    })

    it('uses keyboard shortcuts and record number input to walk in table and open/view specimen', () => {
      cy.get('[data-isfocused="yes"]').should('contain', '621445')
      cy.get('body').type('{downarrow}{downarrow}{downarrow}')
      cy.get('[data-isfocused="yes"]').should('contain', '587520')
      cy.get('body').type('{uparrow}')
      cy.get('[data-isfocused="yes"]').should('contain', '590325')

      cy.get('body').type(' ')
      cy.url().should('include', 'mainColumn=edit')
      cy.getByText('590325')
      cy.getByText('Mus musculoides')

      cy.getInputByParentTestId('currentTableRowInput')
        .clear()
        .type('1')
        // need to use type command twice as using type('16') causes an
        // expected redirect after typing '1', but that makes cypress stop
        // typing so the 6 would be missing.
        .type('6')

      cy.getByText('500001')
      cy.getByText('Mustela erminea')

      cy.getByTestId('tableTabMenuItem').click()
      cy.get('[data-isfocused="yes"]').should('contain', '500001')
    })
  })
