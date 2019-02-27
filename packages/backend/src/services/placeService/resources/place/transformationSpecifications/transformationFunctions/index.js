/* eslint-disable no-param-reassign */

exports.transformPlace = function transformPlace({ src, target }) {
  const {
    migrationData: { name, group, id, isRoot: isRootString, parentId },
    sourceData,
  } = src

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
