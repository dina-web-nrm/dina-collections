const fieldsSpecification = require('../fieldsSpecification')
const extractFilters = require('../../../../../lib/data/fields/utilities/extractFilters')
const createGetManyFilterSpecifications = require('../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const filters = extractFilters({ fieldsSpecification, format: 'object' })

exports.getMany = createGetManyFilterSpecifications({
  custom: filters,
  include: ['id', 'ids'],
})

exports.query = createGetManyFilterSpecifications({
  custom: filters,
  include: ['id', 'raw', 'ids'],
})
