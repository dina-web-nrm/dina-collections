const createGetManyFilters = require('../../../../../../lib/services/operationFactory/filters/createGetManyFilters')

module.exports = createGetManyFilters({
  include: ['ids', 'updatedAfter', 'nameSearch'],
})
