const {
  agent: agentTransformationSpecification,
  establishmentMeansType: establishmentMeansTypeTransformationSpecification,
  featureType: featureTypeTransformationSpecification,
  place: placeTransformationSpecification,
  preparationType: preparationTypeTransformationSpecification,
  storageLocation: storageLocationTransformationSpecification,
  taxon: taxonTransformationSpecification,
  typeSpecimenType: typeSpecimenTypeTransformationSpecification,
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
