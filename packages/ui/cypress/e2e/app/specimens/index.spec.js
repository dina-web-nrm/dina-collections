import form from './form'
import sourceData from './sourceData'
import table from './table'

describe('Specimen', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
    cy.resetElasticSpecimenIndex()
  })

  beforeEach(() => {
    cy.login()
  })

  describe('read-only operations', () => {
    sourceData()
    table()
  })

  describe('write operations', () => {
    form()
  })
})
