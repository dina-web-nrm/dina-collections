const formatModelItemResponse = require('../utilities/formatModelItemResponse')
const delWrapper = require('../../wrappers/methods/del')
const backendError403 = require('common/src/error/errorFactories/backendError403')
const backendError404 = require('common/src/error/errorFactories/backendError404')

const createLog = require('../../../../../utilities/log')

const log = createLog('lib/modelFactories/documentModel/methods/delFactory')

module.exports = function delFactory({ Model }) {
  return delWrapper(({ id }) => {
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

      return existingModel.destroy().then(res => {
        log.info(
          `Deactivated instance for model ${Model.tableName}. id: ${
            storedData.id
          }`
        )

        return formatModelItemResponse({ input: res })
      })
    })
  })
}
