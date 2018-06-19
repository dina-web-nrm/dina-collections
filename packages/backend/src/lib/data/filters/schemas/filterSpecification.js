const filter = require('./filter')

module.exports = {
  additionalProperties: false,
  properties: {
    filters: {
      patternProperties: {
        '.*': filter,
      },
    },
  },
  required: [],
}
