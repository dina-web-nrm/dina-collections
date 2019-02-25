const transformOutputObject = require('../../../utilities/transformations/outputObject')
const transformOutputArray = require('../../../utilities/transformations/outputArray')
const getFormatOutput = require('../../../utilities/relationships/getFormatOutput')
const getUpdateValues = require('./getUpdateValues')
const getForeignKeyName = require('../../../../models/factories/sequelize/utilities/getForeignKeyName')
const createLog = require('../../../../../utilities/log')
const applyHooks = require('../../../utilities/applyHooks')

const log = createLog('lib/controllers/updateSqlRelationship')

module.exports = ({ config, models, operation, serviceInteractor }) => {
  const {
    operationId,
    postHooks = [],
    preHooks = [],
    relation: {
      format,
      keyName,
      keyStoredInModel,
      sourceResource,
      targetAs,
      targetResource,
    },
    resource,
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
      const {
        body: { data },
        pathParams: { id },
      } = request
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
        .then(({ item }) => {
          const internals = item.internals || {}
          log
            .scope()
            .debug('internals[foreignKeyName]', internals[foreignKeyName])

          const updatedItem = internals[foreignKeyName]
            ? {
                id: internals[foreignKeyName],
                type: targetResource,
              }
            : null

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
            return updatedItem
          })
        })
        .then(transformOutput)
        .then(formatOutput)
    })
  }
}
