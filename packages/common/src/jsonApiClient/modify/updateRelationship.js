const schemaInterface = require('../../schemaInterface')
const createLog = require('../../log')
const { Dependor } = require('../../Dependor')
const buildOperationId = require('../../buildOperationId')
const { inverseUpdateRelationship } = require('./inverseUpdateRelationship')

const openApiSpec = schemaInterface.getOpenApiSpec()

const dep = new Dependor({
  buildOperationId,
})

const defaultLog = createLog('common:jsonApiClient:updateRelationship')

const inverseOperationIdMap = {}
Object.keys(openApiSpec.paths).forEach(path => {
  Object.keys(openApiSpec.paths[path] || {}).forEach(verb => {
    const operation = openApiSpec.paths[path][verb]
    if (operation['x-inverseOperationId']) {
      inverseOperationIdMap[operation.operationId] =
        operation['x-inverseOperationId']
    }
  })
}, {})

function updateRelationship({
  item,
  log = defaultLog,
  openApiClient,
  relationKey,
  relationship,
  resourcePath,
}) {
  const { id, type } = item
  const { data } = relationship
  const isArray = Array.isArray(data)
  const operationId = buildOperationId({
    operationType: 'updateRelationship',
    relationKey,
    resource: type,
  })

  const inverseUpdateOperationId = inverseOperationIdMap[operationId]
  if (inverseUpdateOperationId) {
    return inverseUpdateRelationship({
      data,
      id,
      inverseUpdateOperationId,
      isArray,
      item,
      log: log.scope(
        `inverse updateRelationship for ${resourcePath} -> ${
          item.id
        } @ key: ${relationKey} with type: ${isArray ? 'array' : 'object'}`
      ),
      openApiClient,
      relationKey,
      type,
    })
  }

  log.debug(
    `updateRelationship for ${resourcePath} -> ${
      item.id
    } @ key: ${relationKey}. relationships: `,
    data
  )

  const request = {
    body: { data },
    pathParams: {
      id,
    },
  }
  log.debug(`updating with operationId: ${operationId} and request:`, request)

  return openApiClient.call(operationId, request)
}

module.exports = {
  dep,
  updateRelationship,
}
