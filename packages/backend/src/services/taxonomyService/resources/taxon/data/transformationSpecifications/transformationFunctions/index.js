const deleteNullProperties = require('common/src/deleteNullProperties')
/* eslint-disable no-param-reassign */

exports.transformTaxon = function transformTaxon({ src, target }) {
  const { id, parentId, ...rest } = src

  target.doc = deleteNullProperties(rest)

  if (parentId) {
    target.parentId = parentId
  }

  target.id = id
  target.parentId = parentId
}
