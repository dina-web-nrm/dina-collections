const base = require('./base')
const aggregationSpecification = require('../../../data/aggregations/schemas/aggregationSpecification')
const filterSpecification = require('../../../data/filters/schemas/filterSpecification')
const selectableFields = require('../../../data/fields/schemas/selectableFields')
const sortSpecification = require('../../../data/sort/schemas/sortSpecification')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    aggregationSpecification,
    exampleRequests: {
      type: 'object',
    },
    filterSpecification,
    selectableFields,
    sortSpecification,
  },
  required: [...base.required],
}
