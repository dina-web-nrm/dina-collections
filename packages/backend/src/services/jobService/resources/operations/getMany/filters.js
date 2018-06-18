const createGetManyFilters = require('../../../../../lib/filters/utilities/createGetManyFilters')
const createEqualFilter = require('../../../../../lib/filters/utilities/createEqualFilter')

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
