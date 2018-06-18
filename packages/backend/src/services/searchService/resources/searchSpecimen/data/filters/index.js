const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

exports.getMany = createGetManyFilterSpecifications({
  include: ['ids', 'updatedAfter', 'deactivated'],
})
exports.query = createGetManyFilterSpecifications({
  include: ['id'],
})
