const filters = require('./filters')

const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

exports.getMany = createGetManyFilterSpecifications({
  custom: filters,
  include: ['id', 'ids'],
})

exports.query = createGetManyFilterSpecifications({
  custom: filters,
  include: ['id', 'raw'],
})
