const backendError404 = require('common/src/error/errorFactories/backendError404')
const transformOutputObject = require('../../transformations/outputObject')
const transformOutputArray = require('../../transformations/outputArray')
const extractRelationship = require('../extractRelationships/extractRelationship')
const getFormatOutput = require('../getFormatOutput')
const createLog = require('../../../../../utilities/log')

const log = createLog('lib/controllers/updateJsonRelationship')

module.exports = ({ models, operation }) => {
  const {
    operationId,
    relation: { format, keyStoredInModel, targetAs, targetResource },
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

  return ({ request }) => {
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

          if (relationship) {
            return relationship.data
          }

          return format === 'array' ? [] : null
        })
        .then(transformOutput)
        .then(formatOutput)
    })
  }
}
