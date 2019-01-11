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
  resourcePath,
}) {
  if (!Object.keys(relationships)) {
    return Promise.resolve()
  }
  const promises = Object.keys(relationships).map(relationKey => {
    const relationship = relationships[relationKey]
    return updateRelationship({
      item,
      log: log.scope(`${resourcePath} -> updateRelationship: ${relationKey}`),
      openApiClient,
      relationKey,
      relationship,
      resourcePath,
    })
  })
  return Promise.all(promises).then(result => {
    return result
  })
}

module.exports = {
  dep,
  updateRelationships,
}
