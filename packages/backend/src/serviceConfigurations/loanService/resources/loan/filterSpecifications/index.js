const createGetManyFilterSpecifications = require('../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../../lib/data/filters/factories')

const filters = createGetManyFilterSpecifications({
  custom: {
    matchRecipient: createStringMatchFilter({
      fieldPath: 'recipient',
      key: 'matchRecipient',
      lowerCase: false,
    }),
    recipientSearch: createStringSearchFilter({
      fieldPath: 'recipient',
      key: 'recipientSearch',
    }),
  },
  include: ['id', 'ids', 'updatedAfter'],
})

exports.getMany = filters
exports.query = filters
