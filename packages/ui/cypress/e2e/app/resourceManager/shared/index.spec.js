import table from './table'
import tree from './tree'

describe('resourceManager: shared', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
  })

  table()
  tree()
})
