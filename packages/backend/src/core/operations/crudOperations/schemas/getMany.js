const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    filters: {
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
