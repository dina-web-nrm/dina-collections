import form from './form'
import sourceData from './sourceData'
import table from './table'
import tableSettings from './tableSettings'

describe('Specimens read operations', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
    cy.resetElasticSpecimenIndex()
  })

  beforeEach(() => {
    cy.login()
  })

  form()
  sourceData()
  table()
  tableSettings()
})
