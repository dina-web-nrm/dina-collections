const backendError404 = require('common/src/error/errorFactories/backendError404')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/models/factories/sequelize/simpleSqlModel/methods/updateFactory'
)

module.exports = function updateFactory({ getById, Model }) {
  return function update({ doc, id } = {}) {
    if (id === undefined) {
      return Promise.reject(new Error('id not provided'))
    }

    return getById({ id, raw: false }).then(existingModel => {
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

      if (doc !== undefined) {
        const { ...newAttributes } = doc
        newModel = {
          ...storedData,
          ...newAttributes,
        }
      }

      return existingModel.update(newModel).then(savedModel => {
        log.debug(
          `Updated instance for model ${Model.tableName}. id: ${
            savedModel.dataValues.id
          }`
        )
        return savedModel
      })
    })
  }
}
