import form from './form'
import search from './search'
import sourceData from './sourceData'
import table from './table'

describe('Specimens read operations', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
    cy.resetElasticSpecimenIndex()
  })

  form()
  search()
  sourceData()
  table()
})
