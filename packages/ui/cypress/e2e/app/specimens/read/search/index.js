import filters from './filters'
import invalidInput from './invalidInput'

export default () =>
  describe('search', () => {
    beforeEach(() => {
      cy.goToRoute('/app/specimens/mammals/search')
      cy.get('[data-testid="searchMenuItem"', {
        log: false,
        timeout: 60000,
      }).click()
    })

    filters()
    invalidInput()
  })
