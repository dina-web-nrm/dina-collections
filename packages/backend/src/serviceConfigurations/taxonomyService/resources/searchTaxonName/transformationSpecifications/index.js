const validateSearchTaxonName = require('./validateSearchTaxonName')
const fieldsSpecification = require('../fieldsSpecification')
const extractTransformations = require('../../../../../lib/data/fields/utilities/extractTransformationFunctions')

const fieldTransformations = extractTransformations({
  fieldsSpecification,
  format: 'array',
})

const transformationFunctions = [
  ...fieldTransformations,
  validateSearchTaxonName,
]

exports.updateView = {
  description: 'Transforming data from taxonName',

  srcResource: 'taxonName',
  transformationFunctions,
}

exports.rebuildView = {
  cacheRequestsToResources: ['taxonName'],
  description: 'Transforming data from taxonName',
  numberOfEntriesEachBatch: 100,

  srcResource: 'taxonName',
  transformationFunctions,
}
