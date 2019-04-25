const createGetManyFilterSpecifications = require('../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createEqualFilter = require('../../../../../lib/data/filters/factories/createEqualFilter')

const filters = createGetManyFilterSpecifications({
  custom: {
    loanId: createEqualFilter({
      fieldPath: 'loanId',
      filterParameter: 'loanId',
    }),
    loanIds: createEqualFilter({
      fieldPath: 'loanId',
      filterParameter: 'loanIds',
      filterSchema: {
        items: {
          type: 'string',
        },
        type: 'array',
      },
    }),
  },
})

exports.getMany = filters
exports.query = filters
