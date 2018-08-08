const base = require('./base')
const filterSpecification = require('../../../data/filters/schemas/filterSpecification')
const fieldsSpecification = require('../../../data/fields/schemas/fieldsSpecification')
const sortSpecification = require('../../../data/sort/schemas/sortSpecification')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    fieldsSpecification,
    filterSpecification,
    includeRelations: {
      type: 'boolean',
    },
    queryParams: {
      type: 'object',
    },
    sortSpecification,
  },
  required: [...base.required],
}
