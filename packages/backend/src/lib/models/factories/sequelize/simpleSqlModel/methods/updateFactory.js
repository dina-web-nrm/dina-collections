const backendError404 = require('common/src/error/errorFactories/backendError404')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/models/factories/sequelize/simpleSqlModel/methods/updateFactory'
)

module.exports = function updateFactory({
  getById,
  Model,
  schemaVersion,
  validate,
}) {
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
        diff: null,
        id: storedData.id,
        isCurrentVersion: true,
        schemaCompliant: storedData.schemaCompliant,
        version: storedData.version,
        versionId: storedData.versionId,
      }

      if (doc !== undefined) {
        const { ...newAttributes } = doc
        newModel = {
          diff: (storedData.diff || []).concat(diff(storedData.document, doc)),
          document: newAttributes,
          schemaCompliant: !validate(doc),
          schemaVersion,
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
