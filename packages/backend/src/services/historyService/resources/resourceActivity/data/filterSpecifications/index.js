const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createEqualFilter = require('../../../../../../lib/data/filters/factories/createEqualFilter')

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

const customFilters = equalFilterStringParameters.reduce(
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
  custom: customFilters,
  include: ['id', 'ids', 'updatedAfter'],
})

exports.getMany = filters
