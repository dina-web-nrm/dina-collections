const transformOutputObject = require('../../transformations/outputObject')
const transformOutputArray = require('../../transformations/outputArray')
const getFormatOutput = require('../getFormatOutput')
const getUpdateValues = require('./getUpdateValues')
const getForeignKeyName = require('../../../../../lib/sequelize/models/utilities/getForeignKeyName')
const createLog = require('../../../../../utilities/log')

const log = createLog('lib/controllers/updateSqlRelationship')

module.exports = ({ models, operation }) => {
  const {
    operationId,
    relation: {
      format,
      keyName,
      keyStoredInModel,
      sourceResource,
      targetAs,
      targetResource,
    },
  } = operation

  const model = models[keyStoredInModel]

  if (!model) {
    throw new Error(`Model not found for operationId ${operationId}`)
  }

  const foreignKeyName = getForeignKeyName({
    keyName,
    keyStoredInModelName: keyStoredInModel,
    sourceModelName: sourceResource,
    targetAs,
    targetModelName: targetResource,
  })
  const transformOutput =
    format === 'object' ? transformOutputObject : transformOutputArray
  const formatOutput = getFormatOutput({
    format,
    targetResource,
  })

  return ({ request }) => {
    log.debug('operation.relation', operation.relation)
    const { body: { data }, pathParams: { id } } = request

    if (Array.isArray(data)) {
      throw new Error('updateSqlRelationship not implemented for array data')
    }

    const updateValues = getUpdateValues({
      data,
      foreignKeyName,
      format,
      id,
    })

    log.scope().debug('model', model)
    log.scope().debug('updateValues', updateValues)

    return model
      .update(updateValues)
      .then(result => {
        log.scope().debug('result[foreignKeyName]', result[foreignKeyName])
        return result[foreignKeyName]
          ? {
              id: result[foreignKeyName],
              type: targetResource,
            }
          : null
      })
      .then(transformOutput)
      .then(formatOutput)
  }
}
