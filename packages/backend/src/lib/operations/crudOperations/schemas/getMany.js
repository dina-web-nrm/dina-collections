const base = require('./base')
const filterSpecification = require('../../../data/filters/schemas/filterSpecification')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    filterSpecification,
    includeRelations: {
      type: 'boolean',
    },
    queryParams: {
      type: 'object',
    },
  },
  required: [...base.required],
}
