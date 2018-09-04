const fieldsSpecification = require('../fieldsSpecification')
const extractTransformations = require('../../../../../../lib/data/fields/utilities/extractTransformationFunctions')

const fieldTransformations = extractTransformations({
  fieldsSpecification,
  format: 'array',
})

const transformationFunctions = fieldTransformations

const cacheResourcesSpecifications = require('../../../../cacheResourcesSpecifications')

const resourceCacheMap = cacheResourcesSpecifications.reduce(
  (obj, { name, srcResource }) => {
    return {
      ...obj,
      [srcResource]: name,
    }
  },
  {}
)

const warmViews = cacheResourcesSpecifications.map(({ name }) => {
  return name
})

exports.updateView = {
  description: 'Transforming data from specimen',
  resolveRelations: {
    physicalObject: ['storageLocation'],
    storageLocation: ['parent'],
  },
  srcResource: 'specimen',
  transformationFunctions,
}

exports.rebuildView = {
  cacheRequestsToResources: [
    'agent',
    'place',
    'taxonName',
    'taxon',
    'storageLocation',
    'preparationType',
    'causeOfDeathType',
    'featureType',
    'establishmentMeansType',
    'typeSpecimenType',
    'identifierType',
  ],
  description: 'Transforming data from specimen',
  numberOfEntriesEachBatch: 100,
  resolveRelations: {
    physicalObject: ['storageLocation'],
    storageLocation: ['parent'],
  },
  resourceCacheMap,
  srcResource: 'specimen',
  transformationFunctions,
  warmViews,
}
