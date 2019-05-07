import filters from './filters'
import invalidInput from './invalidInput'

export default () =>
  describe('search', () => {
    beforeEach(() => {
      cy.visit('/app/specimens/individuals?mainColumn=table')
      cy.get('[data-testid="searchMenuItem"', {
        log: false,
        timeout: 60000,
      }).click()
    })

    filters()
    invalidInput()
  })
