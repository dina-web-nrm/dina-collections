const fieldsSpecification = require('../fieldsSpecification')
const extractTransformations = require('../../../../../lib/data/fields/utilities/extractTransformationFunctions')

const fieldTransformations = extractTransformations({
  fieldsSpecification,
  format: 'array',
})

const transformationFunctions = fieldTransformations

exports.updateView = {
  description: 'Transforming data from place',
  resolveRelations: {
    place: ['parent'],
  },
  srcRelationships: ['parent'],
  srcResource: 'place',
  transformationFunctions,
}

exports.rebuildView = {
  cacheRequestsToResources: ['place'],
  description: 'Transforming data from place',
  numberOfEntriesEachBatch: 500,
  resolveRelations: {
    place: ['parent'],
  },
  srcRelationships: ['parent'],
  srcResource: 'place',
  transformationFunctions,
}
