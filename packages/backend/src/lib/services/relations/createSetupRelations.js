const setupAssociation = require('../../sequelize/models/utilities/setupAssociation')
const getRelationKey = require('./getRelationKey')

module.exports = function createSetupRelations(relations = []) {
  return function setupRelations({ models } = {}) {
    relations.forEach(relationSpecification => {
      if (relationSpecification.external) {
        return
      }

      const asKey = getRelationKey(relationSpecification)
      setupAssociation({ ...relationSpecification, asKey, models })
    })
  }
}
