const deleteNullProperties = require('common/src/deleteNullProperties')
/* eslint-disable no-param-reassign */

exports.transformTaxon = function transformTaxon({ src, target }) {
  const { id, parentId, ...rest } = src

  target.attributes = deleteNullProperties(rest)

  if (parentId !== undefined) {
    target.internals = { parentId }
  }

  target.id = id
}
