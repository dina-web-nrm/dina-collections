const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const filters = createGetManyFilterSpecifications({
  include: [
    'ancestorsToId',
    'id',
    'ids',
    'updatedAfter',
    'nameSearch',
    'parentId',
    'group',
  ],
})

exports.getMany = filters
exports.query = filters
