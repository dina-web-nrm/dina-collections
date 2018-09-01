const createGetManyFilterSpecifications = require('../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

module.exports = createGetManyFilterSpecifications({
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
