const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const filters = createGetManyFilterSpecifications({
  include: [
    'ancestorsToId',
    'group',
    'id',
    'ids',
    'name',
    'nameSearch',
    'parentId',
    'updatedAfter',
  ],
})

exports.getMany = filters
exports.query = filters
