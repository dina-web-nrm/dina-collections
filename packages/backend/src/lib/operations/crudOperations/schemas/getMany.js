const base = require('./base')
const filterSpecificationMap = require('../../../data/filters/schemas/filterSpecificationMap')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    filterSpecificationMap,
    includeRelations: {
      type: 'boolean',
    },
    queryParams: {
      type: 'object',
    },
  },
  required: [...base.required],
}
