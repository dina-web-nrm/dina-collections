const createGetManyFilters = require('../../../../../lib/filters/utilities/createGetManyFilters')

module.exports = createGetManyFilters({
  include: ['ids', 'updatedAfter', 'nameSearch', 'parentId', 'group'],
})
