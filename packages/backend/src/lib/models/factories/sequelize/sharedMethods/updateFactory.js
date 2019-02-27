const mergeRelationships = require('../../utilities/mergeRelationships')
const updateWrapper = require('../../wrappers/methods/update')
const formatModelItemResponse = require('../utilities/formatModelItemResponse')
const backendError404 = require('common/src/error/errorFactories/backendError404')
const { diff } = require('deep-diff')

const createLog = require('../../../../../utilities/log')

const log = createLog('lib/modelFactories/documentModel/methods/updateFactory')

module.exports = function updateFactory({ Model, validate }) {
  return updateWrapper(({ item = {}, id }) => {
    const { attributes, internals, relationships } = item

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
        diff: null,
        id: storedData.id,
        isCurrentVersion: true,
        schemaCompliant: storedData.schemaCompliant,
        version: storedData.version,
        versionId: storedData.versionId,
      }

      const oldItem = {
        attributes: storedData.document,
        id: storedData.id,
        relationships: storedData.relationships,
      }
      const updatedRelationships =
        mergeRelationships(oldItem.relationships, relationships) || null
      const newItem = {
        attributes,
        id: storedData.id,
        relationships: updatedRelationships,
      }

      newModel = {
        diff: (storedData.diff || []).concat(diff(oldItem, newItem)),
        relationships: updatedRelationships,
        schemaCompliant: !validate(newItem),
      }

      if (newItem.attributes !== undefined) {
        newModel = {
          ...newModel,
          document: attributes,
        }
      }
      if (internals) {
        newModel = {
          ...newModel,
          ...internals,
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
  })
}
