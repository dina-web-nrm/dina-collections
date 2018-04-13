/* eslint-disable sort-keys */
const interpolate = require('../utilities/interpolate')
const normalizeModel = require('../utilities/normalizeModel')
const splitDescription = require('./splitDescription')

module.exports = function createModel({
  examples,
  model,
  modelKey,
  normalize,
  referencePath = '#/components/schemas/',
  removeRelationships = false,
  version,
}) {
  const documentLink = `/docs/${version}/models/`

  const normalizedModel = normalizeModel({ model, normalize })

  let cleanedModel = JSON.parse(JSON.stringify(normalizedModel))

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

  Object.keys(cleanedModel.properties).forEach(property => {
    const { summary, description } = splitDescription(
      cleanedModel.properties[property].description,
      property === 'identifierType'
    )

    cleanedModel.properties[property].description = description
    cleanedModel.properties[property]['x-summary'] = summary
  })

  const { summary, description } = splitDescription(cleanedModel.description)

  cleanedModel.description = description
  cleanedModel['x-summary'] = summary
  cleanedModel = interpolate(cleanedModel, '__DOCLINK__', documentLink)
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
