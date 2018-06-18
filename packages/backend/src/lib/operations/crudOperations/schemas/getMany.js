const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    filterSpecifications: {
      not: {
        type: 'string',
      },
    },
    includeRelations: {
      type: 'boolean',
    },
    queryParams: {
      type: 'object',
    },
  },
  required: [...base.required],
}
