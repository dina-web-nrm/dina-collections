export default () =>
  describe('source data', () => {
    it('shows source data for specimen 500001', () => {
      cy.goToRoute('/dataViewer/sourceData/191')
      cy.getByText('Source data for specimen 500001').should('exist')
    })
  })
