export default () =>
  describe(`table settings`, () => {
    beforeEach(() => {
      cy.goToRoute('/app/specimens/mammals/search')
    })

    it('has all selected by default, can deselect all and save some', () => {
      cy.log('check all column headers exist')
      cy.getByTestId('InfiniteTableHeader')
        .children()
        .should('have.length', 32)
      cy.getByTestId('settingsIcon').click()

      cy.log('check all columns selected')
      cy.get('input[type="checkbox"]')
        .should('have.length', 32)
        .should('have.attr', 'checked')

      cy.log('deselect all and save')
      cy.getByTestId('deselectAllButton').click()
      cy.getByTestId('saveButton').click()
      cy.getByTestId('InfiniteTableHeader')
        .children()
        .should('have.length', 0)

      cy.log('select columns and save')
      cy.getByTestId('settingsIcon').click()
      cy.get('input[name="identifiersCatalogNumber"]').check({ force: true })
      cy.get('input[name="taxonomyCuratorialName"]').check({ force: true })
      cy.get('input[name="collectingEventInterpretedLocality"]').check({
        force: true,
      })
      cy.get('input[name="recordEventLastModified"]').check({ force: true })
      cy.getByTestId('saveButton').click()
      cy.getByTestId('InfiniteTableHeader')
        .children()
        .should('have.length', 4)
      cy.getByTestId('InfiniteTableHeader-identifiersCatalogNumber')
      cy.getByTestId('InfiniteTableHeader-taxonomyCuratorialName')
      cy.getByTestId('InfiniteTableHeader-collectingEventInterpretedLocality')
      cy.getByTestId('InfiniteTableHeader-recordEventLastModified')

      cy.log('reload and check same columns still there')
      cy.reload()
      cy.getByTestId('InfiniteTableHeader')
        .children()
        .should('have.length', 4)
    })
  })
