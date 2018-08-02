const formatModelItemResponse = require('../utilities/formatModelItemResponse')
const deactivateWrapper = require('../../wrappers/methods/deactivate')
const getCurrentUTCTimestamp = require('common/src/date/getCurrentUTCTimestamp')
const backendError403 = require('common/src/error/errorFactories/backendError403')
const backendError404 = require('common/src/error/errorFactories/backendError404')

const createLog = require('../../../../../utilities/log')

const log = createLog(
  'lib/modelFactories/documentModel/methods/deactivateFactory'
)

module.exports = function deactivateFactory({ Model }) {
  return deactivateWrapper(({ id }) => {
    return Model.findOne({
      where: { id },
    }).then(existingModel => {
      if (!existingModel) {
        backendError404({
          code: 'RESOURCE_NOT_FOUND_ERROR',
          detail: `Not found for id ${id}`,
        })
      }

      const storedData = existingModel.get()

      if (storedData.deactivatedAt) {
        backendError403({
          code: 'FORBIDDEN_ERROR',
          detail: `model ${Model.tableName} with id: ${
            storedData.id
          } has already been deactivated at ${storedData.deactivatedAt}`,
        })
      }

      const newModel = {
        ...storedData,
        deactivatedAt: getCurrentUTCTimestamp(),
      }

      return existingModel.update(newModel).then(res => {
        log.debug(
          `Deactivated instance for model ${Model.tableName}. id: ${
            res.dataValues.id
          }`
        )

        return formatModelItemResponse({ input: res })
      })
    })
  })
}
