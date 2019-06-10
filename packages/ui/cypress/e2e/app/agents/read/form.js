export default () =>
  describe('form content', () => {
    beforeEach(() => {
      cy.visit('/app/agents?filterColumn=&itemId=2&mainColumn=edit')
    })

    it('has record history, help text and no legacy data', () => {
      cy.getByText('Record history')
      cy.getByText('Created by Admin', { exact: false })
      cy.getByTestId('sourceDataLink').shouldHaveHref(
        '/dataViewer/sourceData/',
        { exact: false, targetBlank: true }
      )

      cy.log('opens and closes help text in sidebar')
      cy.quickQueryByTestId('inlineNotification').should('not.exist')
      cy.get('i[for="agentType"]').click()
      cy.getByTestId('inlineNotification')
        .should('contain', 'Agent type')
        .within(() => {
          cy.getByTestId('closeIcon').click()
        })
      cy.quickQueryByTestId('inlineNotification').should('not.exist')

      cy.log('checks that legacy data button is disabled')
      cy.getByText('Legacy data')
      cy.getByText('No legacy data').should('be.disabled')
    })
  })
