const base = require('./base')
const aggregationSpecification = require('../../../data/aggregations/schemas/aggregationSpecification')
const filterSpecification = require('../../../data/filters/schemas/filterSpecification')
const fieldsSpecification = require('../../../data/fields/schemas/fieldsSpecification')
const sortSpecification = require('../../../data/sort/schemas/sortSpecification')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    aggregationSpecification,
    exampleRequests: {
      type: 'object',
    },
    fieldsSpecification,
    filterSpecification,
    sortSpecification,
  },
  required: [...base.required],
}
