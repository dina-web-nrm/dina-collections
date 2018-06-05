const { createSelector } = require('reselect')

const getModels = models => models

const getModelRelationshipsSchemaMap = createSelector(getModels, models => {
  if (!models) {
    throw new Error('missing models')
  }

  return Object.keys(models).reduce((modelRelationships, modelName) => {
    const relationships =
      models &&
      models[modelName] &&
      models[modelName].properties &&
      models[modelName].properties.relationships

    if (relationships) {
      return {
        ...modelRelationships,
        [modelName]: relationships,
      }
    }

    return modelRelationships
  }, {})
})

const getAllModelNames = createSelector(
  getModelRelationshipsSchemaMap,
  modelRelationshipsMap => {
    return Object.keys(modelRelationshipsMap)
  }
)

const getModelRelationshipsSchemaForModel = createSelector(
  getModelRelationshipsSchemaMap,
  (_, modelName) => modelName,
  (modelRelationshipsMap, modelName) => {
    if (!modelName) {
      throw new Error('missing model name')
    }

    if (!modelRelationshipsMap[modelName]) {
      throw new Error(`model ${modelName} not found in models`)
    }

    return modelRelationshipsMap[modelName]
  }
)

module.exports = {
  getAllModelNames,
  getModelRelationshipsSchemaForModel,
  getModelRelationshipsSchemaMap,
  getModels,
}
