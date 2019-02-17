const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createEqualFilter = require('../../../../../../lib/data/filters/factories/createEqualFilter')
const createResourceActivityFilterByIds = require('../../../../../../lib/data/filters/factories/createResourceActivityFilterByIds')

const equalFilterStringParameters = [
  'action',
  'relationshipId',
  'relationshipType',
  'requestId',
  'resource',
  'resourceId',
  'service',
  'userId',
]

const stringFilters = equalFilterStringParameters.reduce(
  (obj, filterParameter) => {
    let fieldPath = filterParameter
    if (filterParameter === 'relationshipId') {
      fieldPath = 'resourceId'
    }
    if (filterParameter === 'relationshipType') {
      fieldPath = 'resource'
    }

    const filter = createEqualFilter(
      {
        fieldPath,
        filterParameter,
      },
      {}
    )
    return {
      ...obj,
      [filterParameter]: filter,
    }
  },
  {}
)

const filters = createGetManyFilterSpecifications({
  custom: {
    ...stringFilters,
    normalizedAgentIds: createResourceActivityFilterByIds({
      key: 'normalizedAgentIds',
      resource: 'normalizedAgent',
    }),
    physicalObjectIds: createResourceActivityFilterByIds({
      key: 'physicalObjectIds',
      resource: 'physicalObject',
    }),
    placeIds: createResourceActivityFilterByIds({
      key: 'placeIds',
      resource: 'place',
    }),
    specimenIds: createResourceActivityFilterByIds({
      key: 'specimenIds',
      resource: 'specimen',
    }),
    storageLocationIds: createResourceActivityFilterByIds({
      key: 'storageLocationIds',
      resource: 'storageLocation',
    }),
    taxonIds: createResourceActivityFilterByIds({
      key: 'taxonIds',
      resource: 'taxon',
    }),
    taxonNameIds: createResourceActivityFilterByIds({
      key: 'taxonNameIds',
      resource: 'taxonName',
    }),
  },
  include: ['id', 'ids', 'updatedAfter'],
})

exports.getMany = filters
