const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createEqualFilter = require('../../../../../../lib/data/filters/factories/createEqualFilter')

const equalDateFilterParameters = ['failedAt', 'startedAt', 'succeededAt']

const equalFilterStringParameters = [
  'service',
  'resource',
  'resourceId',
  'action',
  'userId',
  'requestId',
]

const equalDateFilters = equalDateFilterParameters.reduce(
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

const equalStringFilters = equalFilterStringParameters.reduce(
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
  custom: {
    ...equalStringFilters,
    ...equalDateFilters,
  },
  include: ['id', 'ids', 'updatedAfter'],
})

exports.getMany = filters
