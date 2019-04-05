export default () =>
  describe('source data', () => {
    it('shows source data for agent John Doe', () => {
      cy.visit('/dataViewer/sourceData/151')
      cy.getByText('Source data for normalizedAgent. Id: 1')
    })
  })
