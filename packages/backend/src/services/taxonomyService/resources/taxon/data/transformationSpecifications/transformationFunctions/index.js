const createDeleteProperties = require('common/src/createDeleteProperties')

const deleteNullProperties = createDeleteProperties(null)

/* eslint-disable no-param-reassign */
exports.transformTaxon = function transformTaxon({ src, target }) {
  const { migrationData: { id, parentId, ...rest }, sourceData } = src

  target.attributes = deleteNullProperties(rest)

  if (parentId !== undefined) {
    target.internals = { parentId }
  }

  target.id = id
  target.meta = { sourceData }
}
