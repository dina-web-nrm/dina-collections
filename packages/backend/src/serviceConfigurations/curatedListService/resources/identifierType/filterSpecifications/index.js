const createGetManyFilterSpecifications = require('../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const {
  createStringMatchFilter,
} = require('../../../../../lib/data/filters/factories')

const filters = createGetManyFilterSpecifications({
  custom: {
    key: createStringMatchFilter({
      fieldPath: 'key',
      key: 'key',
    }),
  },
  include: ['id', 'ids'],
})

exports.getMany = filters
