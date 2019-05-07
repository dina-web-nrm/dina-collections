describe(`Specimens table settings`, () => {
  beforeEach(() => {
    cy.login()
    cy.goToRoute('/app/specimens/individuals?mainColumn=table')
    cy.get('[data-testid="infinityTableHeader"', {
      log: false,
      timeout: 60000,
    })
  })

  it(`has all columns selected by default, can deselect all, cannot save
    if none selected, can save selected`, () => {
    cy.log('check all column headers exist')
    cy.getByTestId('infinityTableHeader')
      .children()
      .should('have.length', 32)
    cy.getByTestId('settingsMenuItem').click()

    cy.log('check all columns selected')
    cy.get('input[type="checkbox"]')
      .should('have.length', 32)
      .should('have.attr', 'checked')

    cy.log('deselect all and check save button disabled')
    cy.getByTestId('deselectAllButton').click()
    cy.getByTestId('saveButton').should('be.disabled')

    cy.log('select columns and save')
    cy.get('input[name="identifiersCatalogNumber"]').check({ force: true })
    cy.get('input[name="taxonomyCuratorialName"]').check({ force: true })
    cy.get('input[name="collectingEventInterpretedLocality"]').check({
      force: true,
    })
    cy.get('input[name="recordEventLastModified"]').check({ force: true })
    cy.getByTestId('saveButton').click()
    cy.getByTestId('infinityTableHeader')
      .children()
      .should('have.length', 4)
    cy.getByTestId('infinityTableHeader-identifiersCatalogNumber')
    cy.getByTestId('infinityTableHeader-taxonomyCuratorialName')
    cy.getByTestId('infinityTableHeader-collectingEventInterpretedLocality')
    cy.getByTestId('infinityTableHeader-recordEventLastModified')

    cy.log('reload and check same columns still there')
    cy.reload()
    cy.getByTestId('infinityTableHeader')
      .children()
      .should('have.length', 4)
  })
})
