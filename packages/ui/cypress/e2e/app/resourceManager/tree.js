export default () =>
  describe('tree', () => {
    before(() => {
      cy.resetSearchPlaceIndex()
    })

    it(`
      shows only root initially;
      expands node;
      preserves focus and expanded state going from tree to table and back;
      preserves expanded state in tree also when going to table and focusing not
      yet expanded item;
      focuses collapsing item if focused item is child to collapsing item;
      opens filter by transitioning to table view
    `, () => {
      cy.visit('/app/localities?mainColumn=tree')

      cy.log('shows only root initially')
      cy.get('[data-testid=tree] .row').should('have.length', 1)

      cy.log('expands node')
      cy.getByTestId('expandIcon').click()
      cy.get('[data-testid=tree] .row').should('have.length', 5)

      cy.log(`preserves focus and expanded state going from tree to table and 
        back`)
      cy.getByText('Europe').click()
      cy.get('[data-isfocused="yes"]').should('contain', 'Europe')
      cy.getByTestId('tableTabMenuItem').click()
      cy.get('[data-isfocused="yes"]').should('contain', 'Europe')
      cy.getByTestId('treeTabMenuItem').click()
      cy.get('[data-isfocused="yes"]').should('contain', 'Europe')

      cy.log(`preserves expanded state in tree also when going to table and 
        focusing not yet expanded item`)
      cy.get('[data-isfocused="yes"]').within(() => {
        cy.getByTestId('expandIcon').click()
        cy.getByTestId('collapseIcon')
      })
      cy.getByText('Sweden').click()
      cy.getByTestId('tableTabMenuItem').click()
      cy.getByText('Yacuma').click()
      cy.getByTestId('treeTabMenuItem').click()
      cy.getByText('Sweden')
      cy.getTreeListItemRowByText('Europe').within(() => {
        cy.quickQueryByTestId('expandIcon').should('not.exist')
        cy.getByTestId('collapseIcon')
      })
      cy.getByText('Yacuma')
      cy.get('[data-isfocused="yes"]').should('contain', 'Yacuma')

      cy.log(`focuses collapsing item if focused item is child to collapsing
      item`)
      cy.getTreeListItemRowByText('Bolivia').within(() => {
        cy.getByTestId('collapseIcon').click()
      })
      cy.get('[data-isfocused="yes"]').should('contain', 'Bolivia')

      cy.log('opens filter by transitioning to table view')
      cy.getByTestId('searchMenuItem').click()
      cy.url().should('contain', 'mainColumn=table')
      cy.getByTestId('filterColumn').should('contain', 'Filter')
    })
  })
