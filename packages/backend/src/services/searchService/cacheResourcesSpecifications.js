module.exports = [
  {
    name: 'cacheAgent',
    srcResource: 'agent',
  },
  {
    name: 'cacheCauseOfDeathType',
    srcResource: 'causeOfDeathType',
  },
  {
    name: 'cacheFeatureType',
    srcResource: 'featureType',
  },
  {
    name: 'cachePreparationType',
    srcResource: 'preparationType',
  },
  {
    name: 'cacheEstablishmentMeansType',
    srcResource: 'establishmentMeansType',
  },
  {
    name: 'cacheTypeSpecimenType',
    srcResource: 'typeSpecimenType',
  },
  {
    name: 'cacheIdentifierType',
    srcResource: 'identifierType',
  },
  {
    name: 'cacheStorageLocation',
    srcRelationships: ['parent'],
    srcResource: 'storageLocation',
  },
  {
    name: 'cachePhysicalObject',
    srcResource: 'physicalObject',
  },
  {
    name: 'cacheTaxon',
    srcResource: 'taxon',
  },
  {
    name: 'cacheTaxonName',
    srcResource: 'taxonName',
  },
]
