const createGetManyFilters = require('../../../../../lib/services/operationFactory/filters/createGetManyFilters')
const createEqualFilter = require('../../../../../lib/services/operationFactory/filters/createEqualFilter')

const equalFilterParameters = [
  'deactivatedAt',
  'failedAt',
  'startedAt',
  'succeededAt',
]

module.exports = createGetManyFilters({
  custom: equalFilterParameters.reduce((obj, filterParameter) => {
    const filter = createEqualFilter(
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
  }, {}),
})
