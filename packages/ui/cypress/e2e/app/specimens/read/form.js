export default () =>
  describe('form content', () => {
    beforeEach(() => {
      cy.goToRoute('/app/specimens/mammals/1/edit/sections/0')
      cy.get('[data-testid="basicInformation"]', { log: false }) // wait until section rendered
    })

    it('has record history', () => {
      cy.getByText('Record history')
      cy.getByText('Created by Admin', { exact: false })
      cy.getByTestId('sourceDataLink').shouldHaveHref(
        '/dataViewer/sourceData/',
        { exact: false, targetBlank: true }
      )
    })
  })
