const base = require('./base')

exports.rebuildView = base
exports.rebuildView = {
  additionalProperties: false,
  properties: {
    ...base.properties,

    mapFunction: {
      not: {
        type: 'string',
      },
    },
    srcResource: {
      type: 'string',
    },
    warmViews: {
      type: 'array',
    },
  },
  required: [...base.required],
}
exports.requestRebuildView = base
exports.requestUpdateView = base
exports.updateView = base
