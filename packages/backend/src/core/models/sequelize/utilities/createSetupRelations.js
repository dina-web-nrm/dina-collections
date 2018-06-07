const {
  getRelationshipParamsForModelNames,
} = require('common/src/schemaInterface')
const setupAssociation = require('./setupAssociation')
const createLog = require('../../../../utilities/log')

const log = createLog('lib/sequelize', 1)

module.exports = function createSetupRelations(modelNames = []) {
  const relationshipsParamsArray = getRelationshipParamsForModelNames(
    modelNames
  )

  return function setupRelations({ models } = {}) {
    log.debug(modelNames.join(', '))
    relationshipsParamsArray.forEach(relationshipsParamsItem => {
      // TODO: replace this first check with validation through a schema
      if (!relationshipsParamsItem.sourceResource) {
        log.scope().debug('No sourceResource for:', relationshipsParamsItem)
        return
      }

      if (relationshipsParamsItem.keyType === 'json') {
        log
          .scope()
          .debug(
            'Skipping, json key for:',
            relationshipsParamsItem.sourceResource
          )
        return
      }

      setupAssociation({ ...relationshipsParamsItem, models })
    })
  }
}
