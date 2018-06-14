const base = require('./base')

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
exports.requestRebuildView = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    srcResource: {
      type: 'string',
    },
  },
  required: [...base.required],
}
exports.emptyView = base
exports.requestUpdateView = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    srcResource: {
      type: 'string',
    },
  },
  required: [...base.required],
}
exports.updateView = {
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
  },
  required: [...base.required],
}
