const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const filters = createGetManyFilterSpecifications({
  include: [
    'ancestorsToId',
    'excludeRootNode',
    'group',
    'id',
    'ids',
    'isRootNode',
    'name',
    'nameSearch',
    'nodesWithCircularDependencies',
    'parentId',
    'updatedAfter',
  ],
})

exports.getMany = filters
exports.query = filters
