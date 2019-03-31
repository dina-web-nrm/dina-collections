import create from './create'
import edit from './edit'
import validate from './validate'
import remove from './remove'

describe('Specimens write operations', () => {
  beforeEach(() => {
    // resetting db and search is done in each file
    cy.login()
  })

  create()
  edit()
  remove()
  validate()
})
