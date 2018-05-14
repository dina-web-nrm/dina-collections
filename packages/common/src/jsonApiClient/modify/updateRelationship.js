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

const deleteNotIncludedRelationships = ({
  item,
  log,
  openApiClient,
  relationItemsToUpdate,
  relationKey,
  type,
  // reverseOperationId,
}) => {
  const operationId = buildOperationId({
    operationType: 'getRelationHasMany',
    relationKey,
    resource: type,
  })

  return openApiClient
    .call(operationId, {
      pathParams: {
        id: item.id,
      },
    })
    .then(result => {
      const { data: existingRelations } = result
      const relationsToRemove = existingRelations.filter(existingRelation => {
        return !!relationItemsToUpdate.find(({ id }) => {
          return existingRelation.id === id
        })
      })
      log.debug(
        'The following relationships should be removed: ',
        relationsToRemove
      )
      return true
      // TODO need backend support for this
      // const promises = relationsToRemove.map(relationToRemove => {
      //   return openApiClient.call(reverseOperationId, {
      //     body: {
      //       data: null,
      //     },
      //     pathParams: {
      //       id: relationToRemove.id,
      //     },
      //   })
      // })
      // return Promise.all(promises)
    })
}

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

      return deleteNotIncludedRelationships({
        item,
        log,
        openApiClient,
        relationItemsToUpdate: data,
        relationKey,
        reverseOperationId,
        type,
      }).then(() => {
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
      })
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
