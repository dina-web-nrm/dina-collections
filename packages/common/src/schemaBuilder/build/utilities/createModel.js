/* eslint-disable sort-keys */
const interpolate = require('../utilities/interpolate')
const normalizeModel = require('../utilities/normalizeModel')

module.exports = function createModel({
  examples,
  model,
  modelKey,
  normalize,
  referencePath = '#/components/schemas/',
  removeRelationships = false,
}) {
  const normalizedModel = normalizeModel({ model, normalize })

  const cleanedModel = normalizedModel

  if (
    removeRelationships &&
    cleanedModel.properties &&
    cleanedModel.properties.relationships
  ) {
    delete cleanedModel.properties.relationships
  }

  if (model.modelType) {
    cleanedModel['x-modelType'] = model.modelType
    delete cleanedModel.modelType
  }

  if (examples) {
    cleanedModel['x-examples'] = examples

    if (examples.primary) {
      cleanedModel.example = examples.primary
    }
  }

  return interpolate(
    {
      ...cleanedModel,
      description: cleanedModel.description || '',
      id: modelKey,
    },
    '__ROOT__',
    referencePath
  )
}
