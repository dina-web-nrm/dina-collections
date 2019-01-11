const schemaInterface = require('../../schemaInterface')
const createLog = require('../../log')
const { Dependor } = require('../../Dependor')
const buildOperationId = require('../../buildOperationId')

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

const deleteNotIncludedRelationships = ({
  item,
  log,
  openApiClient,
  relationItemsToUpdate,
  relationKey,
  type,
  inverseOperationId,
}) => {
  const getRelationshipOperationId = buildOperationId({
    operationType: 'getRelationship',
    relationKey,
    resource: type,
  })
  const inverseGetOperationId =
    inverseOperationIdMap[getRelationshipOperationId]

  return openApiClient
    .call(inverseGetOperationId || getRelationshipOperationId, {
      pathParams: {
        id: item.id,
      },
    })
    .then(result => {
      const { data: existingRelations } = result

      if (existingRelations) {
        const existingRelationsArray = Array.isArray(existingRelations)
          ? existingRelations
          : [existingRelations]

        const relationItemsToUpdateArray = Array.isArray(relationItemsToUpdate)
          ? relationItemsToUpdate
          : [relationItemsToUpdate]

        const relationsToRemove = existingRelationsArray.filter(
          ({ id: existingId }) => {
            const isPreexisting = relationItemsToUpdateArray.find(({ id }) => {
              return id === existingId
            })

            return !isPreexisting
          }
        )

        if (relationsToRemove.length) {
          log.debug(
            `The following ${relationKey} should be removed:`,
            relationsToRemove
          )

          const updateRelationshipOperationId = buildOperationId({
            operationType: 'updateRelationship',
            relationKey,
            resource: type,
          })

          const promises = relationsToRemove.map(relationToRemove => {
            return openApiClient.call(
              inverseOperationId || updateRelationshipOperationId,
              {
                body: {
                  data: null,
                },
                pathParams: {
                  id: relationToRemove.id || item.id,
                },
              }
            )
          })
          return Promise.all(promises)
        }

        log.debug(`Nothing to remove for ${relationKey}`)
        return Promise.resolve()
      }

      log.debug(`No existing relations for ${relationKey}`)
      return Promise.resolve({ data: null })
    })
}

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
  const inverseOperationId = inverseOperationIdMap[operationId]
  if (inverseOperationId) {
    log.debug(
      `inverse updateRelationship with ${inverseOperationId} for ${
        resourcePath
      } -> ${item.id} @ key: ${relationKey}. relationships: `,
      data
    )

    return deleteNotIncludedRelationships({
      inverseOperationId,
      isArray,
      item,
      log,
      openApiClient,
      relationItemsToUpdate: data,
      relationKey,
      type,
    }).then(removedRelationships => {
      log.debug(
        `inverse updateRelationship for ${resourcePath} -> ${item.id} @ key: ${
          relationKey
        }. relationships: `,
        data
      )
      if (isArray) {
        const promises = data.map(relationshipItem => {
          return openApiClient.call(inverseOperationId, {
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

      if (data && data.id) {
        return openApiClient.call(inverseOperationId, {
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

      return removedRelationships
    })
  }

  return deleteNotIncludedRelationships({
    inverseOperationId,
    isArray,
    item,
    log,
    openApiClient,
    relationItemsToUpdate: data,
    relationKey,
    type,
  }).then(() => {
    log.debug(
      `updateRelationship for ${resourcePath} -> ${item.id} @ key: ${
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
  })
}

module.exports = {
  dep,
  updateRelationship,
}
