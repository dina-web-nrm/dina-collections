const {
  establishmentMeansType: establishmentMeansTypeTransformationSpecification,
  featureType: featureTypeTransformationSpecification,
  normalizedAgent: normalizedAgentTransformationSpecification,
  place: placeTransformationSpecification,
  preparationType: preparationTypeTransformationSpecification,
  storageLocation: storageLocationTransformationSpecification,
  taxon: taxonTransformationSpecification,
  typeSpecimenType: typeSpecimenTypeTransformationSpecification,
} = require('./data/transformationSpecifications')

module.exports = [
  {
    name: 'lookupFeatureType',
    transformationSpecification: featureTypeTransformationSpecification,
  },
  {
    name: 'lookupNormalizedAgent',
    transformationSpecification: normalizedAgentTransformationSpecification,
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
    name: 'lookupEstablishmentMeansType',
    transformationSpecification: establishmentMeansTypeTransformationSpecification,
  },
  {
    name: 'lookupTaxon',
    transformationSpecification: taxonTransformationSpecification,
  },

  {
    name: 'lookupTypeSpecimenType',
    transformationSpecification: typeSpecimenTypeTransformationSpecification,
  },
]
