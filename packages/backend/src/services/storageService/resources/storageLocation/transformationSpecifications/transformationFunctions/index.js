/* eslint-disable no-param-reassign */

exports.transformStorageLocation = function transformStorageLocation({
  src,
  target,
}) {
  const {
    migrationData: { name, group, id, isRoot: isRootString, parentId },
    sourceData,
  } = src
  if (!name) {
    return
  }

  const isRoot = isRootString === 'True'

  if (isRoot && parentId) {
    throw new Error(`id: ${id} is root but have a parent id`)
  }

  target.attributes = {
    group,
    name,
  }

  if (isRoot) {
    target.attributes.isRoot = isRoot
  }

  target.id = id
  target.internals = {
    parentId,
  }

  target.meta = { sourceData }
}
