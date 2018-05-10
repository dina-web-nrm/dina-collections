const createLog = require('../../log')
const { Dependor } = require('../../Dependor')
const buildOperationId = require('../../buildOperationId')

const dep = new Dependor({
  buildOperationId,
})

const defaultLog = createLog('common:jsonApiClient:updateRelationship')

function updateRelationship({
  item,
  log = defaultLog,
  openApiClient,
  relationKey,
  relationship,
}) {
  const { id, type } = item
  const { data } = relationship
  const isArray = Array.isArray(data)
  if (isArray) {
    const operationId = buildOperationId({
      operationType: 'updateRelationHasMany',
      relationKey,
      resource: type,
    })
    log.debug(
      `updateRelationship (hasMany) for ${item.type} -> ${item.id} @ key: ${
        relationKey
      }. relationships: `,
      data
    )
    return openApiClient.call(operationId, {
      body: { data },
      pathParams: {
        id,
      },
    })
  }
  const operationId = buildOperationId({
    operationType: 'updateRelationHasOne',
    relationKey,
    resource: type,
  })

  log.debug(
    `updateRelationship (hasOne) for ${item.type} -> ${item.id} @ key: ${
      relationKey
    }. relationships: `,
    data
  )

  return openApiClient.call(operationId, {
    body: { data },
    pathParams: {
      id,
    },
  })
}

module.exports = {
  dep,
  updateRelationship,
}
