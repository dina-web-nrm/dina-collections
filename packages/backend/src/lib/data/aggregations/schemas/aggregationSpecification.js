const aggregation = require('./aggregation')

module.exports = {
  additionalProperties: false,
  properties: {
    aggregations: {
      patternProperties: {
        '.*': aggregation,
      },
    },
  },
  required: [],
}
