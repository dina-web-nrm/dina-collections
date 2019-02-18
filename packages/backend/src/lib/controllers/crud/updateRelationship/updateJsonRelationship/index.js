const backendError404 = require('common/src/error/errorFactories/backendError404')
const transformOutputObject = require('../../../utilities/transformations/outputObject')
const transformOutputArray = require('../../../utilities/transformations/outputArray')
const extractRelationship = require('../../../utilities/relationships/extractRelationships/extractRelationship')
const getFormatOutput = require('../../../utilities/relationships/getFormatOutput')
const applyHooks = require('../../../utilities/applyHooks')
const createLog = require('../../../../../utilities/log')

const log = createLog('lib/controllers/updateJsonRelationship')

module.exports = ({ config, models, operation, serviceInteractor }) => {
  const {
    operationId,
    postHooks = [],
    preHooks = [],
    relation: { format, keyStoredInModel, targetAs, targetResource },
    resource,
  } = operation

  const model = models[keyStoredInModel]

  if (!model) {
    throw new Error(`Model not found for operationId ${operationId}`)
  }

  const transformOutput =
    format === 'object' ? transformOutputObject : transformOutputArray
  const formatOutput = getFormatOutput({
    format,
    targetResource,
  })

  return ({ request, user, requestId }) => {
    return applyHooks({
      config,
      hooks: preHooks,
      operation,
      request,
      requestId,
      resource,
      serviceInteractor,
      user,
    }).then(() => {
      log.debug('operation.relation', operation.relation)
      const { body: { data }, pathParams: { id } } = request

      log.scope().debug('model', model)
      log.scope().debug('data', data)

      return model.getById({ id }).then(({ item: fetchedResource } = {}) => {
        if (!fetchedResource) {
          backendError404({
            code: 'RESOURCE_NOT_FOUND_ERROR',
            detail: `Cant find resource: ${keyStoredInModel}, with id: ${id} `,
          })
        }

        const newItem = {
          ...fetchedResource.attributes,
          relationships: {
            [targetAs]: { data },
          },
        }

        return model
          .update({
            id,
            item: newItem,
          })
          .then(({ item: updatedItem = {} }) => {
            const relationship = extractRelationship({
              item: updatedItem,
              queryParamRelationships: [targetAs],
              relation: operation.relation,
              relationKey: targetAs,
            })
            log.scope().debug('extracted relationship', relationship)

            return applyHooks({
              config,
              hooks: postHooks,
              item: updatedItem,
              operation,
              request,
              requestId,
              resource,
              serviceInteractor,
              user,
            }).then(() => {
              if (relationship) {
                return relationship.data
              }

              return format === 'array' ? [] : null
            })
          })
          .then(transformOutput)
          .then(formatOutput)
      })
    })
  }
}
