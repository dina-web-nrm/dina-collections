import create from './write/create'

describe('Agents', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
  })

  beforeEach(() => {
    cy.login()
  })

  describe('write', () => {
    create()
  })
})
