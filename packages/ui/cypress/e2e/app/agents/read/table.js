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
      cy.getByText('Anders Sparrman') // wait for first agent in table
      cy.getByTestId('formTabMenuItem').click()
      cy.getByTestId('formSectionNavigationHeader').should(
        'contain',
        'Anders Sparrman'
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

      cy.log('uses keyboard shortcut to open form')
      cy.getByText('John Doe').click()
      cy.get('body').type(' ')
      cy.getByTestId('formSectionNavigationHeader').should(
        'contain',
        'John Doe'
      )
    })
  })
