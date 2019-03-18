export default () =>
  describe('table', () => {
    beforeEach(() => {
      cy.goToRoute('/app/specimens/mammals/search')
    })

    describe(`scrolling and sorting`, () => {
      it('scrolls to load more specimens and sorts table', () => {
        cy.log('Check first specimen and that the last is not visible')
        cy.get(
          '[data-testid="InfiniteTable"] [data-testid="InfiniteTableRow-1"]',
          {
            timeout: 20000,
          }
        ).should('contain', '621445')
        cy.queryByText('500001').should('not.exist')

        cy.log('Scroll to bottom of table and check last is visible')
        cy.get('[data-testid="resultTableScrollContainer"]')
          .as('table')
          .scrollTo(0, 2000, { duration: 500 })
        cy.get('[data-testid="InfiniteTable"]')
          .find('[data-testid="InfiniteTableRow-16"]', {
            timeout: 20000,
          })
          .should('contain', '500001')

        // cy.log('Sort and scroll to top and check 500001 is now on top')
        // cy.get(
        //   '[data-testid="InfiniteTableHeader-identifiersCatalogNumber"]'
        // ).click()
        // cy.get('@table').scrollTo('topLeft', { duration: 500 })
        // cy.wait(5000)
        // cy.get('[data-testid="InfiniteTable"]').find('.row:first', {
        //   timeout: 20000,
        // }).should(
        //   'contain',
        //   '50000'
        // )

        // cy.log('Sort again and check 500001 is now on bottom')
        // cy.get(
        //   '[data-testid="InfiniteTableHeader-identifiersCatalogNumber"]'
        // ).click()
        // cy.get('@table').scrollTo('bottomLeft', { duration: 500 })
        // cy.wait(5000)
        // cy.get('@table').scrollTo(0, 2000, { duration: 500 })
        // cy.wait(5000)
        // cy.get('[data-testid="InfiniteTable"] .row:last').should(
        //   'contain',
        //   'Mustela erminea'
        // )
      })
    })
  })
