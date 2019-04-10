const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    filter: {
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
