const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createEqualFilter = require('../../../../../../lib/data/filters/factories/createEqualFilter')

const equalFilterStringParameters = [
  'service',
  'resource',
  'resourceId',
  'action',
  'userId',
  'requestId',
]

const customFilters = equalFilterStringParameters.reduce(
  (obj, filterParameter) => {
    const filter = createEqualFilter(
      {
        fieldPath: filterParameter,
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
