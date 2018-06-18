const createGetManyFilterSpecifications = require('../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

module.exports = createGetManyFilterSpecifications({
  include: ['ids', 'updatedAfter', 'nameSearch', 'parentId', 'group'],
})
