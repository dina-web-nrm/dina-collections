const transformationSpecification = require('../../../data/transformations/schemas/transformationSpecification')
const base = require('./base')

exports.rebuildView = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    postHooks: {
      type: 'array',
    },
    preHooks: {
      type: 'array',
    },
    queryParams: {
      type: 'object',
    },
    transformationSpecification,
  },

  required: [...base.required],
}

exports.emptyView = base
exports.updateView = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    postHooks: {
      type: 'array',
    },
    preHooks: {
      type: 'array',
    },
    queryParams: {
      type: 'object',
    },
    transformationSpecification,
  },
  required: [...base.required],
}

exports.getViewMeta = {
  ...base,
}
