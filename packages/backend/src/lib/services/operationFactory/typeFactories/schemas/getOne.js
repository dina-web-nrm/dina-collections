const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    buildWhere: {
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
