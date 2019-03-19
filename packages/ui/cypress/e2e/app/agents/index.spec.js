import generalCrud from './write/generalCrud'

describe('Agents', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
  })

  beforeEach(() => {
    cy.login()
  })

  describe('write', () => {
    generalCrud()
  })
})
