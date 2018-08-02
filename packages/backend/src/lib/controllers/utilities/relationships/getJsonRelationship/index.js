const createGetManyFilterSpecifications = require('../../../../data/filters/utilities/createGetManyFilterSpecifications')
const backendError404 = require('common/src/error/errorFactories/backendError404')
const transformOutputObject = require('../../transformations/outputObject')
const transformOutputArray = require('../../transformations/outputArray')
const getFormatOutput = require('../getFormatOutput')
const getGetterName = require('./getGetterName')
const getQueryModels = require('./getQueryModels')
const getSelectedResult = require('./getSelectedResult')
const getWhereParams = require('./getWhereParams')
const createLog = require('../../../../../utilities/log')

const log = createLog('lib/controllers/getJsonRelationship')

module.exports = ({ models, operation }) => {
  const {
    operationId,
    relation: { format, keyStoredInModel, oneOrMany, targetAs, targetResource },
  } = operation

  const { model } = getQueryModels({
    keyStoredInModel,
    models,
  })

  if (!model) {
    throw new Error(`Model not found for operationId ${operationId}`)
  }

  const getterName = getGetterName({
    format,
    oneOrMany,
  })
  const transformOutput =
    format === 'object' ? transformOutputObject : transformOutputArray
  const formatOutput = getFormatOutput({
    format,
    targetResource,
  })

  const filterSpecification = createGetManyFilterSpecifications({
    include: ['id'],
  })

  return ({ request }) => {
    log.debug('operation.relation', operation.relation)

    const { pathParams: { id } } = request

    const where = getWhereParams({ id })

    log.scope().debug('model', model)
    log.scope().debug('where', where)

    return model[getterName]({
      filterInput: where,
      filterSpecification,
    })
      .then(({ items, item } = {}) => {
        const result = items || (item && item.internals)

        if (!result) {
          backendError404({
            code: 'RESOURCE_NOT_FOUND_ERROR',
            detail: `${keyStoredInModel} with id: ${id} not found`,
          })
        }

        log.scope().debug('getterName', getterName, 'targetAs', targetAs)
        const selectedResult = getSelectedResult({
          getterName,
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
