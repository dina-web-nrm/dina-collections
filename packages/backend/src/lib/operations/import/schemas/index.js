const transformationSpecification = require('../../../data/transformations/schemas/transformationSpecification')
const base = require('./base')

exports.importDataFromFile = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    transformationSpecification,
  },
  required: [...base.required],
}
