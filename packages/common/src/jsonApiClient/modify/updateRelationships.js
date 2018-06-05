const createLog = require('../../log')
const { Dependor } = require('../../Dependor')
const { updateRelationship } = require('./updateRelationship')

const dep = new Dependor({
  updateRelationship,
})

const defaultLog = createLog('common:jsonApiClient:updateRelationships')

function updateRelationships({
  item,
  log = defaultLog,
  openApiClient,
  relationships,
}) {
  log.debug('updateRelationships: start', relationships)
  const promises = Object.keys(relationships).map(relationKey => {
    const relationship = relationships[relationKey]
    return updateRelationship({
      item,
      log: log.scope(),
      openApiClient,
      relationKey,
      relationship,
    })
  })
  return Promise.all(promises).then(result => {
    log.debug('updateRelationships: done')
    return result
  })

  // return Object.keys(relationships).map(relationKey => {})
}

module.exports = {
  dep,
  updateRelationships,
}
