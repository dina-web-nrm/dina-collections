const {
  getRelationshipParamsForModelNames,
} = require('common/src/schemaInterface')
const setupAssociation = require('./setupAssociation')

module.exports = function createSetupRelations(modelNames = []) {
  const relationshipsParamsArray = getRelationshipParamsForModelNames(
    modelNames
  )

  return function setupRelations({ models } = {}) {
    relationshipsParamsArray.forEach(relationshipsParamsItem => {
      // TODO: replace this first check with validation through a schema
      if (!relationshipsParamsItem.sourceResource) {
        return
      }

      if (relationshipsParamsItem.keyType === 'json') {
        return
      }

      setupAssociation({ ...relationshipsParamsItem, models })
    })
  }
}
