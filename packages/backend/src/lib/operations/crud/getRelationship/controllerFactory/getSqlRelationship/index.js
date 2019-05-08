const transformOutputObject = require('../../../../utilities/transformations/outputObject')
const transformOutputArray = require('../../../../utilities/transformations/outputArray')
const getFormatOutput = require('../../../../utilities/relationships/getFormatOutput')
const getGetterName = require('./getGetterName')
const getInclude = require('./getInclude')
const getQueryModels = require('./getQueryModels')
const getSelectedResult = require('./getSelectedResult')
const getWhereParams = require('./getWhereParams')
const getForeignKeyName = require('../../../../../models/sequelize/utilities/getForeignKeyName')
const createLog = require('../../../../../../utilities/log')

const log = createLog('lib/controllers/getSqlRelationship')

module.exports = ({ models, operationSpecification }) => {
  const {
    operationId,
    relation: {
      format,
      keyName,
      keyStoredInModel,
      oneOrMany,
      sourceResource,
      targetAs,
      targetResource,
    },
  } = operationSpecification

  const { idIsForeignKey, model, relationshipModel } = getQueryModels({
    keyStoredInModel,
    models,
    sourceResource,
    targetResource,
  })

  if (!model) {
    throw new Error(`Model not found for operationId ${operationId}`)
  }

  const getterName = getGetterName({ oneOrMany, targetAs })
  const include = getInclude({ relationshipModel, targetAs })
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
    log.debug(
      'operationSpecification.relation',
      operationSpecification.relation
    )

    const {
      pathParams: { id },
    } = request

    const where = getWhereParams({
      foreignKeyName,
      id,
      idIsForeignKey,
    })

    log.scope().debug('model', model)
    log.scope().debug('include', include)
    log.scope().debug('where', where)

    return model[getterName]({
      include,
      includeDeactivated: true,
      where,
    })
      .then(({ items, item } = {}) => {
        const result = items || (item && item.internals)
        log
          .scope()
          .debug('idIsForeignKey', idIsForeignKey, 'targetAs', targetAs)
        const selectedResult = getSelectedResult({
          idIsForeignKey,
          result,
          targetAs,
        })
        log.scope().debug('selectedResult', selectedResult)
        return selectedResult
      })
      .then(transformOutput)
      .then(formatOutput)
  }
}
