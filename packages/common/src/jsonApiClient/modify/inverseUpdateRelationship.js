const { Dependor } = require('../../Dependor')
const buildOperationId = require('../../buildOperationId')

const dep = new Dependor({
  buildOperationId,
})

const deleteNotIncludedRelationships = ({
  inverseUpdateOperationId,
  item,
  log,
  openApiClient,
  relationItemsToUpdate,
  relationKey,
  type,
}) => {
  const getRelationshipOperationId = buildOperationId({
    operationType: 'getRelationship',
    relationKey,
    resource: type,
  })

  const request = {
    pathParams: {
      id: item.id,
    },
  }
  log.debug(
    `Fetching current relationships with getRelationshipOperationId: ${getRelationshipOperationId}`,
    request
  )
  return openApiClient
    .call(getRelationshipOperationId, request)
    .then(result => {
      const { data: existingRelations } = result
      if (!existingRelations) {
        log.debug(`No existing relations for ${relationKey}`)
        return Promise.resolve({ data: null })
      }

      log.debug('Got existing relations:', existingRelations)

      const existingRelationsArray = Array.isArray(existingRelations)
        ? existingRelations
        : [existingRelations]

      const relationItemsToUpdateArray = Array.isArray(relationItemsToUpdate)
        ? relationItemsToUpdate
        : [relationItemsToUpdate]

      const relationsToRemove = existingRelationsArray.filter(
        ({ id: existingId }) => {
          const existInUpdate = relationItemsToUpdateArray.find(({ id }) => {
            return id === existingId
          })
          if (existInUpdate) {
            log.debug(
              `Not removing current relation id: ${existingId}. Exist in update`
            )
          }

          return !existInUpdate
        }
      )

      if (relationsToRemove.length) {
        log.debug(
          `The following ${relationKey} should be removed:`,
          relationsToRemove
        )

        const promises = relationsToRemove.map(relationToRemove => {
          const updateRequest = {
            body: {
              data: null,
            },
            pathParams: {
              id: relationToRemove.id,
            },
          }

          log.debug(
            `Removing relation with inverseUpdateOperationId: ${inverseUpdateOperationId}`,
            updateRequest
          )

          return openApiClient.call(inverseUpdateOperationId, updateRequest)
        })
        return Promise.all(promises)
      }

      log.debug(`Nothing to remove for ${relationKey}`)
      return Promise.resolve()
    })
}

function inverseUpdateRelationship({
  data,
  id,
  inverseUpdateOperationId,
  isArray,
  item,
  log,
  openApiClient,
  relationKey,
  type,
}) {
  return deleteNotIncludedRelationships({
    inverseUpdateOperationId,
    isArray,
    item,
    log: log.scope('Deleting not included relationships'),
    openApiClient,
    relationItemsToUpdate: data,
    relationKey,
    type,
  }).then(removedRelationships => {
    if (isArray) {
      const promises = data.map(relationshipItem => {
        const request = {
          body: {
            data: {
              id,
              type,
            },
          },
          pathParams: {
            id: relationshipItem.id,
          },
        }
        log.debug(
          `updating with inverseOperationId: ${inverseUpdateOperationId} and request:`,
          request
        )
        return openApiClient.call(inverseUpdateOperationId, request)
      })
      return Promise.all(promises)
    }

    if (data && data.id) {
      const request = {
        body: {
          data: {
            id,
            type,
          },
        },
        pathParams: {
          id: data.id,
        },
      }
      log.debug(
        `updating with inverseOperationId: ${inverseUpdateOperationId} and request:`,
        request
      )
      return openApiClient.call(inverseUpdateOperationId, request)
    }

    return removedRelationships
  })
}

module.exports = {
  dep,
  inverseUpdateRelationship,
}
