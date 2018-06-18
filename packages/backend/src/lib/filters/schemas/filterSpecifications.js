const filterSpecification = require('./filterSpecification')

module.exports = {
  additionalProperties: false,
  patternProperties: {
    '.*': filterSpecification,
  },
  required: [],
}
