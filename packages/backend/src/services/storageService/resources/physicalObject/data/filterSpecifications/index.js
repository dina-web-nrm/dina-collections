const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createEqualFilter = require('../../../../../../lib/data/filters/factories/createEqualFilter')

const filters = createGetManyFilterSpecifications({
  custom: {
    storageLocationId: createEqualFilter({
      fieldPath: 'storageLocationId',
      filterParameter: 'storageLocationId',
    }),
    storageLocationIds: createEqualFilter({
      fieldPath: 'storageLocationId',
      filterParameter: 'storageLocationIds',
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
