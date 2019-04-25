const base = require('../../schemas/operationConfigurations/basePostSchema')
const transformationSpecification = require('../../../data/transformations/schemas/transformationSpecification')

exports.rebuildView = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    queryParams: {
      type: 'object',
    },
    transformationSpecification,
  },

  required: [...base.required],
}
