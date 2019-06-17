const validateSearchAgent = require('./validateSearchAgent')
const fieldsSpecification = require('../fieldsSpecification')
const extractTransformations = require('../../../../../lib/data/fields/utilities/extractTransformationFunctions')

const fieldTransformations = extractTransformations({
  fieldsSpecification,
  format: 'array',
})

const transformationFunctions = [...fieldTransformations, validateSearchAgent]

exports.updateView = {
  description: 'Transforming data from normalizedAgent',

  srcResource: 'normalizedAgent',
  transformationFunctions,
}

exports.rebuildView = {
  cacheRequestsToResources: ['normalizedAgent'],
  description: 'Transforming data from normalizedAgent',
  numberOfEntriesEachBatch: 1000,

  srcResource: 'normalizedAgent',
  transformationFunctions,
}
