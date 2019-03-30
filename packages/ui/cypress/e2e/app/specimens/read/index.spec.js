import form from './form'
import search from './search'
import sourceData from './sourceData'
import table from './table'
import tableSettings from './tableSettings'

describe('Specimens read operations', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
    cy.resetElasticSpecimenIndex()
  })

  beforeEach(() => {
    cy.visit('/')
  })

  form()
  search()
  sourceData()
  table()
  tableSettings()
})
