export default () =>
  describe('table', () => {
    beforeEach(() => {
      cy.visit('/app/agents')
      cy.get('[data-testid="infinityTableHeader"', {
        log: false,
        timeout: 60000,
      })
    })

    it('switch between form and table tab', () => {
      cy.log('checks that switching between form and table tabs works')
      cy.getByText('John Doe')
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('formSectionNavigationHeader').should(
        'contain',
        'John Doe'
      )
      cy.getByTestId('formSectionNavigationSubheader').should(
        'contain',
        'Person'
      )
      cy.getByTestId('tableTabMenuItem').click()

      cy.log('checks again that switching between form and table tab works')
      cy.getByText('Pehr Osbeck').click()
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('formSectionNavigationHeader').should(
        'contain',
        'Pehr Osbeck'
      )
      cy.getByTestId('formSectionNavigationSubheader').should(
        'contain',
        'Person'
      )
      cy.getByTestId('tableTabMenuItem').click()
    })
  })
