const createGetManyFilterSpecifications = require('../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const {
  agent: agentTransformationSpecification,
  featureType: featureTypeTransformationSpecification,
  place: placeTransformationSpecification,
  preparationType: preparationTypeTransformationSpecification,
  storageLocation: storageLocationTransformationSpecification,
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
    getManyFilters: createGetManyFilterSpecifications({
      include: ['ids', 'parentId', 'group', 'name'],
    }),
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
