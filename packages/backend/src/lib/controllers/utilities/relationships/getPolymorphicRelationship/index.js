const transformOutputObject = require('../../transformations/outputObject')
const transformOutputArray = require('../../transformations/outputArray')
const getFormatOutput = require('../getFormatOutput')
const getQueryModels = require('./getQueryModels')
const createLog = require('../../../../../utilities/log')

const log = createLog('lib/controllers/getPolymorphicRelationship')

module.exports = ({ models, operation }) => {
  const {
    operationId,
    relation: {
      format,
      keyName,
      keyStoredInModel,
      sourceResource,
      targetResource,
    },
  } = operation

  const { model } = getQueryModels({
    keyStoredInModel,
    models,
    sourceResource,
    targetResource,
  })

  if (!model) {
    throw new Error(`Model not found for operationId ${operationId}`)
  }

  const getterName = 'getWhere'
  const foreignKeyName = keyName

  const transformOutput =
    format === 'object' ? transformOutputObject : transformOutputArray
  const formatOutput = getFormatOutput({
    format,
    targetResource,
  })

  return ({ request }) => {
    log.debug('operation.relation', operation.relation)

    const { pathParams: { id } } = request

    const storedInSource = sourceResource === keyStoredInModel
    const where = storedInSource
      ? { id }
      : {
          [foreignKeyName]: id,
          resource: targetResource,
        }

    log.scope().debug('model', model)
    log.scope().debug('where', where)

    return model[getterName]({
      includeDeactivated: true,
      where,
    })
      .then(({ items, item } = {}) => {
        const result = items || item.internals
        log.scope().debug('result', result)
        return result
      })
      .then(transformOutput)
      .then(formatOutput)
  }
}
