const fieldsSpecification = require('../fieldsSpecification')
const extractAggregations = require('../../../../../../lib/data/fields/utilities/extractAggregations')

const aggregations = extractAggregations({
  fieldsSpecification,
  format: 'object',
})

module.exports = { aggregations }
