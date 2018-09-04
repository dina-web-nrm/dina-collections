const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createEqualFilterSpecification = require('../../../../../../lib/data/filters/utilities/createEqualFilterSpecification')

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
    const filter = createEqualFilterSpecification(
      {
        filterParameter,
        path: filterParameter,
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
