const openApiSpec = require('../../../dist/openApi.json')
const createLog = require('../../log')
const { Dependor } = require('../../Dependor')
const buildOperationId = require('../../buildOperationId')

const dep = new Dependor({
  buildOperationId,
})

const defaultLog = createLog('common:jsonApiClient:updateRelationship')

const reverseOperationIdMap = {}
Object.keys(openApiSpec.paths).forEach(path => {
  Object.keys(openApiSpec.paths[path] || {}).forEach(verb => {
    const operation = openApiSpec.paths[path][verb]
    if (operation['x-inverseOperationId']) {
      reverseOperationIdMap[operation.operationId] =
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
    const reverseOperationId = reverseOperationIdMap[operationId]
    if (reverseOperationId) {
      log.debug(
        `reverse updateRelationship (hasMany) with ${reverseOperationId} for ${
          item.type
        } -> ${item.id} @ key: ${relationKey}. relationships: `,
        data
      )
      const promises = data.map(relationshipItem => {
        return openApiClient.call(reverseOperationId, {
          body: {
            data: {
              id,
              type,
            },
          },
          pathParams: {
            id: relationshipItem.id,
          },
        })
      })
      return Promise.all(promises)
    }

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

  const reverseOperationId = reverseOperationIdMap[operationId]
  if (reverseOperationId) {
    log.debug(
      `reverse updateRelationship (hasOne) for ${item.type} -> ${
        item.id
      } @ key: ${relationKey}. relationships: `,
      data
    )

    return openApiClient.call(reverseOperationId, {
      body: {
        data: {
          id,
          type,
        },
      },
      pathParams: {
        id: data.id,
      },
    })
  }

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
