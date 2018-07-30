const {
  place: placeTransformationSpecification,
  preparationType: preparationTypeTransformationSpecification,
  storageLocation: storageLocationTransformationSpecification,
} = require('./data/transformationSpecifications')

module.exports = [
  // {
  //   name: 'cacheAgent',
  //   srcResource: 'agent',
  // },
  // {
  //   name: 'cacheCauseOfDeathType',
  //   srcResource: 'causeOfDeathType',
  // },
  // {
  //   name: 'cacheFeatureType',
  //   srcResource: 'featureType',
  // },
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
  // {
  //   name: 'cacheTaxon',
  //   srcResource: 'taxon',
  // },
  // {
  //   name: 'cacheTaxonName',
  //   srcResource: 'taxonName',
  // },
]
