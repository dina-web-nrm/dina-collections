const createDeleteProperties = require('common/src/createDeleteProperties')

const deleteNullProperties = createDeleteProperties(null)

/* eslint-disable no-param-reassign */
exports.transformTaxon = function transformTaxon({ src, target }) {
  const { migrationData: { id, parentId, isRoot, ...rest }, sourceData } = src

  target.attributes = deleteNullProperties(rest)

  if (isRoot) {
    target.attributes.isRoot = isRoot
  }
  if (parentId !== undefined) {
    target.internals = { parentId }
  }

  if (isRoot && parentId) {
    throw new Error(`id: ${id} is root but have a parent id`)
  }

  target.id = id
  target.meta = { sourceData }
}
