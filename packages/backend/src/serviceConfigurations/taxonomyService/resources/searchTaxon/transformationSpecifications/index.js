const validateSearchTaxon = require('./validateSearchTaxon')
const fieldsSpecification = require('../fieldsSpecification')
const extractTransformations = require('../../../../../lib/data/fields/utilities/extractTransformationFunctions')

const fieldTransformations = extractTransformations({
  fieldsSpecification,
  format: 'array',
})

const transformationFunctions = [...fieldTransformations, validateSearchTaxon]

exports.updateView = {
  description: 'Transforming data from taxon',
  resolveRelations: {
    taxon: ['parent'],
  },
  srcRelationships: [
    'acceptedTaxonName',
    'parent',
    'vernacularNames',
    'synonyms',
  ],
  srcResource: 'taxon',
  transformationFunctions,
}

exports.rebuildView = {
  cacheRequestsToResources: ['taxon', 'taxonName'],
  description: 'Transforming data from taxon',
  numberOfEntriesEachBatch: 500,
  resolveRelations: {
    taxon: ['parent'],
  },

  srcRelationships: [
    'acceptedTaxonName',
    'parent',
    'vernacularNames',
    'synonyms',
  ],
  srcResource: 'taxon',
  transformationFunctions,
}
