import form from './form'
import search from './search'
import sourceData from './sourceData'
import table from './table'

describe('Agent read operations', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
  })

  form()
  search()
  sourceData()
  table()
})
