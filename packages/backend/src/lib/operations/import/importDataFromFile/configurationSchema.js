const base = require('../../schemas/operationConfigurations/baseSchema')
const transformationSpecification = require('../../../data/transformations/schemas/transformationSpecification')

exports.importDataFromFile = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    transformationSpecification,
  },
  required: [...base.required],
}
