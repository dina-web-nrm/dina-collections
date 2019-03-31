import create from './write/create'

describe('Agents', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
  })

  beforeEach(() => {
    cy.visit('/')
  })

  describe('write', () => {
    create()
  })
})
