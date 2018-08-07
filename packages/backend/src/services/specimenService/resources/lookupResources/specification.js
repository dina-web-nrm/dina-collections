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
  // {
  //   name: 'cacheCauseOfDeathType',
  //   srcResource: 'causeOfDeathType',
  // },
  {
    name: 'lookupFeatureType',
    transformationSpecification: featureTypeTransformationSpecification,
  },
  {
    name: 'lookupPreparationType',
    transformationSpecification: preparationTypeTransformationSpecification,
  },
  // {
  //   name: 'cacheEstablishmentMeansType',
  //   srcResource: 'establishmentMeansType',
  // },
  // {
  //   name: 'cacheTypeSpecimenType',
  //   srcResource: 'typeSpecimenType',
  // },
  // {
  //   name: 'cacheIdentifierType',
  //   srcResource: 'identifierType',
  // },
  {
    name: 'lookupPlace',
    transformationSpecification: placeTransformationSpecification,
  },
  {
    name: 'lookupStorageLocation',
    transformationSpecification: storageLocationTransformationSpecification,
  },
  // {
  //   name: 'cachePhysicalObject',
  //   srcResource: 'physicalObject',
  // },
  {
    name: 'lookupTaxon',
    transformationSpecification: taxonTransformationSpecification,
  },
  // {
  //   name: 'cacheTaxonName',
  //   srcResource: 'taxonName',
  // },
]
