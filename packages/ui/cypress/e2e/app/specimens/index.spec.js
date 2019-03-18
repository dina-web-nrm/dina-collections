import form from './form'
import sourceData from './sourceData'
import table from './table'
import tableSettings from './tableSettings'

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
    tableSettings()
  })

  describe('write operations', () => {
    form()
  })
})
