const {
  agent: agentTransformationSpecification,
  featureType: featureTypeTransformationSpecification,
  place: placeTransformationSpecification,
  preparationType: preparationTypeTransformationSpecification,
  storageLocation: storageLocationTransformationSpecification,
  taxon: taxonTransformationSpecification,
} = require('./data/transformationSpecifications')

module.exports = [
  {
    name: 'lookupAgent',
    transformationSpecification: agentTransformationSpecification,
  },
  {
    name: 'lookupFeatureType',
    transformationSpecification: featureTypeTransformationSpecification,
  },
  {
    name: 'lookupPreparationType',
    transformationSpecification: preparationTypeTransformationSpecification,
  },
  {
    name: 'lookupPlace',
    transformationSpecification: placeTransformationSpecification,
  },
  {
    name: 'lookupStorageLocation',
    transformationSpecification: storageLocationTransformationSpecification,
  },
  {
    name: 'lookupTaxon',
    transformationSpecification: taxonTransformationSpecification,
  },
]
