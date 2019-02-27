const fieldsSpecification = require('../fieldsSpecification')
const extractTransformations = require('../../../../../lib/data/fields/utilities/extractTransformationFunctions')

const transformationFunctions = extractTransformations({
  fieldsSpecification,
  format: 'array',
})

exports.updateView = {
  description: 'Update catalogNumber for specimen',
  resolveRelations: true,
  srcRelationships: ['identifierTypes'],
  srcResource: 'specimen',
  transformationFunctions,
}

exports.rebuildView = {
  description: 'Transforming data from specimen',
  numberOfEntriesEachBatch: 100,
  resolveRelations: true,
  srcRelationships: ['identifierTypes'],
  srcResource: 'specimen',
  transformationFunctions,
}
