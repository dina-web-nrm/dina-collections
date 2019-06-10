import table from './table'
import tree from './tree'

describe('resourceManager', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
  })

  table()
  tree()
})
