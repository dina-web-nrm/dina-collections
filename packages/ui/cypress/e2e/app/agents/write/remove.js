export default () =>
  describe('delete', () => {
    before(() => {
      cy.resetDevelopmentSqlDb()
      cy.resetSearchNormalizedAgentIndex()
      cy.resetSearchSpecimenIndex()
    })

    beforeEach(() => {
      cy.visit('/app/agents')
      cy.get('[data-testid="infinityTableHeader"]', {
        log: false,
        timeout: 60000,
      })
    })

    it(`
    prevents deletion of agent related to specimen and shows relationship;
    can delete agent after relationship removed
    `, () => {
      cy.log('connect agent to specimen')
      cy.goToRoute('/app/specimens/mammals?mainColumn=create&sectionId=0')
      cy.getByTestId('createAutomaticNumber').click()
      cy.url().should('include', 'mainColumn=edit')
      cy.getByTestId('formSectionNavigationItem-collectingDeath').click()
      cy.getByText('Interpret this name').click()
      cy.getDropdownSearchByName(
        'individual.collectingInformation.0.collectedByAgent'
      ).type('Anders')
      cy.getDropdownOptionByText('Anders Sparrman').click()
      cy.getByTestId('saveButton').click()

      cy.log('try to delete agent')
      cy.goToRoute('/app/agents')
      cy.getByText('Anders Sparrman').click()
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('deleteButton').click()
      cy.getByTestId('confirmDeleteButton').click()
      cy.getByText('The record was not deleted')
      cy.getByText('inspect relations here', { exact: false }).click()
      cy.getByText('Relations for: Anders Sparrman (person)')
      cy.getByText('Close').click()
      cy.log('delete related specimen')
      cy.go('back')
      cy.go('back')
      cy.go('back')
      cy.getByTestId('deleteButton').click()
      cy.getByTestId('confirmDeleteButton').click()
      cy.getByText('The record was deleted')
      cy.url()
        .should('include', 'table')
        .should('not.include', 'edit')

      cy.log('delete agent')
      cy.goToRoute('/app/agents')
      cy.getByText('Anders Sparrman').click()
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('deleteButton').click()
      cy.getByTestId('confirmDeleteButton').click()
      cy.getByText('The record was deleted')
      cy.url()
        .should('include', 'table')
        .should('not.include', 'edit')
      cy.getByText('Carl Peter Thunberg')
        .parent()
        .should('have.attr', 'data-isfocused', 'yes')
      cy.quickQueryByText('Anders Sparrman').should('not.exist')
    })
  })
