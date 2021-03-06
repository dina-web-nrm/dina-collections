const mergeRelationships = require('../../utilities/mergeRelationships')
const updateWrapper = require('../../utilities/wrappers/methods/update')
const formatModelItemResponse = require('../utilities/formatModelItemResponse')
const backendError404 = require('common/src/error/errorFactories/backendError404')
const { diff } = require('deep-diff')

const createLog = require('../../../../utilities/log')

const log = createLog('lib/models/documentModel/methods/updateFactory')

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
        id: storedData.id,
        isCurrentVersion: true,
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

      const itemDiff = diff(oldItem, newItem)
      newModel = {
        relationships: updatedRelationships,
      }

      if (validate) {
        const error = validate(newItem)
        if (error) {
          log.err('schema validation failed')
        }
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
        return formatModelItemResponse({ diff: itemDiff, input: res })
      })
    })
  })
}
