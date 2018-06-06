const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
  },
  required: [...base.required],
}
