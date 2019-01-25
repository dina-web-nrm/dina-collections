const createDeleteProperties = require('common/src/createDeleteProperties')

const deleteNullProperties = createDeleteProperties(null)

/* eslint-disable no-param-reassign */
exports.transformTaxon = function transformTaxon({ src, target }) {
  const {
    migrationData: { id, parentId, isRoot: isRootString, ...rest },
    sourceData,
  } = src

  target.attributes = deleteNullProperties(rest)

  const isRoot = isRootString === 'True'

  if (isRoot && parentId) {
    throw new Error(`id: ${id} is root but have a parent id`)
  }

  if (isRoot) {
    target.attributes.isRoot = isRoot
  }

  if (parentId !== undefined) {
    target.internals = { parentId }
  }

  target.id = id
  target.meta = { sourceData }
}
