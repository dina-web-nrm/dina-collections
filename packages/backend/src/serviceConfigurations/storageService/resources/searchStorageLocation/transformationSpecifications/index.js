const validateSearchStorageLocation = require('./validateSearchStorageLocation')
const fieldsSpecification = require('../fieldsSpecification')
const extractTransformations = require('../../../../../lib/data/fields/utilities/extractTransformationFunctions')

const fieldTransformations = extractTransformations({
  fieldsSpecification,
  format: 'array',
})

const transformationFunctions = [
  ...fieldTransformations,
  validateSearchStorageLocation,
]

exports.updateView = {
  description: 'Transforming data from storageLocation',
  resolveRelations: {
    storageLocation: ['parent'],
  },
  srcRelationships: ['parent'],
  srcResource: 'storageLocation',
  transformationFunctions,
}

exports.rebuildView = {
  cacheRequestsToResources: ['storageLocation'],
  description: 'Transforming data from storageLocation',
  numberOfEntriesEachBatch: 500,
  resolveRelations: {
    storageLocation: ['parent'],
  },
  srcRelationships: ['parent'],
  srcResource: 'storageLocation',
  transformationFunctions,
}
