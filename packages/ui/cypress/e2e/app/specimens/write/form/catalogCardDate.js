export default () =>
  describe('catalog card date input', () => {
    it('sets and validates catalog card date', () => {
      const momentNow = Cypress.moment()

      cy.goToRoute('/app/specimens/mammals/create/sections/0')
      cy.getByTestId('createAutomaticNumber')
        .click()
        .url()
        .should('include', '/edit/')

      cy.log('Check validation error for future year')
      cy.getByText('Add catalog card creation').click()
      cy.getInputByFieldLabel('Year').type(momentNow.year() + 1)
      cy.getByText('Done').click()
      cy.getByText('Only past dates allowed')

      cy.log('Allows current year as date')
      cy.getInputByFieldLabel('Year')
        .clear()
        .type(momentNow.year())
      cy.getByText('Done').click()
      cy.getByTestId('recordHistoryExternalEvents').should(
        'contain',
        `${momentNow.format('YYYY')}:`
      )

      cy.log('Allows current year and month as date')
      cy.getByTestId('editRecordHistoryEventIcon').click()
      cy.getInputByFieldLabel('Month')
        .clear()
        .type(momentNow.month() + 1) // month is zero-based index
      cy.getByText('Done').click()
      cy.getByTestId('recordHistoryExternalEvents').should(
        'contain',
        `${momentNow.format('YYYY-MM')}:`
      )

      cy.log('Allows current year, month and day as date')
      cy.getByTestId('editRecordHistoryEventIcon').click()
      cy.getInputByFieldLabel('Day')
        .clear()
        .type(momentNow.date())
      cy.getByText('Done').click()
      cy.getByTestId('recordHistoryExternalEvents').should(
        'contain',
        `${momentNow.format('YYYY-MM-DD')}:`
      )

      cy.goToRoute('/app/specimens/mammals/create/sections/0')
    })
  })
