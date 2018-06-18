const base = require('./base')
const aggregationSpecification = require('../../../data/aggregations/schemas/aggregationSpecification')
const filterSpecification = require('../../../data/filters/schemas/filterSpecification')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    aggregationSpecification,
    exampleRequests: {
      type: 'object',
    },
    filterSpecification,
  },
  required: [...base.required],
}
