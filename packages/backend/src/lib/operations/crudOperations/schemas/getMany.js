const base = require('./base')
const filterSpecifications = require('../../../filters/schemas/filterSpecifications')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    filterSpecifications,
    includeRelations: {
      type: 'boolean',
    },
    queryParams: {
      type: 'object',
    },
  },
  required: [...base.required],
}
