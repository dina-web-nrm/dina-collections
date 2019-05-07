export default () =>
  describe('form content', () => {
    beforeEach(() => {
      cy.visit('/app/specimens/mammals?mainColumn=edit&itemId=1&sectionId=0')
      // wait until section rendered
      cy.get('[data-testid="basicInformation"]', { log: false, timeout: 60000 })
    })

    it('has record history and help texts', () => {
      cy.getByText('Record history')
      cy.getByText('Created by Admin', { exact: false })
      cy.getByTestId('sourceDataLink').shouldHaveHref(
        '/dataViewer/sourceData/',
        { exact: false, targetBlank: true }
      )

      cy.log('opens and closes help text in sidebar')
      cy.quickQueryByTestId('inlineNotification').should('not.exist')
      cy.get('i[for="publishRecord"]').click()
      cy.getByTestId('inlineNotification')
        .should('contain', 'Public')
        .within(() => {
          cy.getByTestId('closeIcon').click()
        })
      cy.quickQueryByTestId('inlineNotification').should('not.exist')

      cy.log('opens and closes help text in modal on modal')
      cy.quickQueryByTestId('modalNotification').should('not.exist')
      cy.getByText('Add catalog card creation').click()
      cy.get('i[for="individual.recordHistoryEvents.2.agent"]').click()
      cy.getByTestId('modalNotification')
        .should('contain', 'Card author')
        .parent()
        .click('right')
      cy.quickQueryByTestId('modalNotification').should('not.exist')
      cy.getByText('Done').click()

      cy.log('opens another inline help text')
      cy.getByTestId('identifiers').within(() => {
        cy.getByTestId('formFieldHelpIcon').click()
      })
      cy.getByTestId('inlineNotification').should('contain', 'Identifiers')

      cy.getByText('Undo changes').click() // to avoid preventing browser unload
    })
  })
