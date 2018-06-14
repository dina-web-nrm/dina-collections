const createGetManyFilters = require('../../../../../lib/services/operationFactory/filters/createGetManyFilters')
const createEqualFilter = require('../../../../../lib/services/operationFactory/filters/createEqualFilter')

const equalFilterParameters = [
  'deactivatedAt',
  'failedAt',
  'startedAt',
  'succeededAt',
]

module.exports = createGetManyFilters({
  custom: equalFilterParameters.map(filterParameter => {
    return createEqualFilter({
      filterParameter,
      path: filterParameter,
    })
  }),
})
