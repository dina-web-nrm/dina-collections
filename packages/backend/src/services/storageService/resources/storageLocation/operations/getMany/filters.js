const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

module.exports = createGetManyFilterSpecifications({
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
