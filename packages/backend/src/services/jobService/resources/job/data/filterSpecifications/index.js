const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createEqualFilter = require('../../../../../../lib/data/filters/factories/createEqualFilter')

const equalFilterParameters = [
  'deactivatedAt',
  'failedAt',
  'startedAt',
  'succeededAt',
]

const filters = createGetManyFilterSpecifications({
  custom: equalFilterParameters.reduce((obj, filterParameter) => {
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
  }, {}),
})

exports.getMany = filters
exports.query = filters
