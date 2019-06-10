import tree from './tree'

describe('resourceManager', () => {
  before(() => {
    cy.resetDevelopmentSqlDb()
  })

  tree()
})
