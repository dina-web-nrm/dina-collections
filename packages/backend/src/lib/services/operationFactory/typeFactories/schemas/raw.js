const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    auth: { type: 'boolean' },
    method: { type: 'string' },
    path: { type: 'string' },
    raw: { type: 'boolean' },
    request: { type: 'object' },
    resource: { type: 'string' },
    response: { type: 'object' },
    summary: { type: 'string' },
  },
  required: [...base.required],
}
