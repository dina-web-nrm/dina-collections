const base = require('../../schemas/operationConfigurations/baseSchema')
const filterSpecification = require('../../../data/filters/schemas/filterSpecification')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    filterSpecification,
    queryParams: {
      type: 'object',
    },
  },
  required: [...base.required],
}
