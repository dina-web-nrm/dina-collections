const createGetManyFilterSpecifications = require('../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createEqualFilterSpecification = require('../../../../../lib/data/filters/utilities/createEqualFilterSpecification')

const equalFilterParameters = [
  'deactivatedAt',
  'failedAt',
  'startedAt',
  'succeededAt',
]

const filters = createGetManyFilterSpecifications({
  custom: equalFilterParameters.reduce((obj, filterParameter) => {
    const filter = createEqualFilterSpecification(
      {
        filterParameter,
        filterSchema: {
          oneOf: [
            {
              type: 'string',
            },
            {
              type: 'null',
            },
          ],
        },
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

exports.getMany = filters
exports.query = filters
