const createGetManyFilterSpecifications = require('../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createEqualFilterSpecification = require('../../../../../lib/data/filters/utilities/createEqualFilterSpecification')

const equalFilterParameters = [
  'deactivatedAt',
  'failedAt',
  'startedAt',
  'succeededAt',
]

module.exports = createGetManyFilterSpecifications({
  custom: equalFilterParameters.reduce((obj, filterParameter) => {
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
  }, {}),
})
