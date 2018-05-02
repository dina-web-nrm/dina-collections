const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')

const { modifyRelationshipResource } = require('./modifyRelationshipResource')

const dep = new Dependor({
  modifyRelationshipResource,
})

const defaultLog = createLog('common:jsonApiClient:recursiveCreate')

function modifyRelationshipResources(
  { log = defaultLog, openApiClient, relationships, resourcesToModify } = {}
) {
  return Promise.resolve().then(() => {
    if (!openApiClient) {
      throw new Error('provide openApiClient')
    }
    if (!(relationships && Object.keys(relationships).length)) {
      return {}
    }
    const updatedRelationships = { ...relationships }

    log.debug('modifyRelationshipResources: start')
    const promises = Object.keys(relationships).map(relationKey => {
      const relationship = relationships[relationKey]
      return dep
        .modifyRelationshipResource({
          log: log.scope(),
          openApiClient,
          relationKey,
          relationship,
          resourcesToModify,
        })
        .then(updatedRelationship => {
          updatedRelationships[relationKey] = updatedRelationship
        })
    })
    return Promise.all(promises).then(() => {
      log.debug('modifyRelationshipResources: done')
      return updatedRelationships
    })
  })
}

module.exports = {
  dep,
  modifyRelationshipResources,
}
