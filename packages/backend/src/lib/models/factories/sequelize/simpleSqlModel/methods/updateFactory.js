const formatModelItemResponse = require('../../utilities/formatModelItemResponse')
const backendError404 = require('common/src/error/errorFactories/backendError404')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/models/factories/sequelize/simpleSqlModel/methods/updateFactory'
)

module.exports = function updateFactory({ Model }) {
  return function update({ item = {}, id } = {}) {
    const { attributes } = item
    if (id === undefined) {
      return Promise.reject(new Error('id not provided'))
    }

    return Model.findOne({
      where: {
        deactivatedAt: null,
        id,
      },
    }).then(existingModel => {
      if (!existingModel) {
        backendError404({
          code: 'RESOURCE_NOT_FOUND_ERROR',
          detail: `Not found for id ${id}`,
        })
      }
      const storedData = existingModel.get()

      let newModel = {
        id: storedData.id,
      }

      if (attributes !== undefined) {
        const { ...newAttributes } = attributes
        newModel = {
          ...storedData,
          ...newAttributes,
        }
      }

      return existingModel.update(newModel).then(res => {
        log.info(
          `Updated instance for model ${Model.tableName}. id: ${
            res.dataValues.id
          }`
        )
        return formatModelItemResponse({ includeDiff: true, input: res })
      })
    })
  }
}
