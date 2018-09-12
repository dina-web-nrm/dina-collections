const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const filters = createGetManyFilterSpecifications({
  include: [
    'ancestorsToId',
    'group',
    'id',
    'ids',
    'nameSearch',
    'nodesWithCircularDependencies',
    'parentId',
    'updatedAfter',
  ],
})

exports.getMany = filters
exports.query = filters
