/* eslint-disable sort-keys */
const setupRefs = require('./setupRefs')
const interpolate = require('../utilities/interpolate')
const splitDescription = require('./splitDescription')
const setupRelationships = require('./setupRelationships')

module.exports = function createModel({
  examples,
  model,
  modelKey,
  normalize,
  referencePath = '#/components/schemas/',
  removeRelationships = false,
  version,
}) {
  const documentLink = `/dataModelDocs/${version}/models/`

  let cleanedModel = setupRelationships({
    model,
    format: normalize ? 'jsonApi' : 'nested',
  })

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
    cleanedModel.properties[property]['x-summary'] = cleanedModel.properties[
      property
    ]['x-summary']
      ? cleanedModel.properties[property]['x-summary']
      : summary
  })

  const { summary, description } = splitDescription(cleanedModel.description)

  cleanedModel.description = description
  cleanedModel['x-summary'] = cleanedModel['x-summary']
    ? cleanedModel['x-summary']
    : summary
  cleanedModel = interpolate(cleanedModel, '__DOCLINK__', documentLink)

  return setupRefs({
    model: cleanedModel,
    modelKey,
    normalize,
    referencePath,
  })
}
