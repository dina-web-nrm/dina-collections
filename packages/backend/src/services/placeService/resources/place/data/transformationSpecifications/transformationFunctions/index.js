/* eslint-disable no-param-reassign */

exports.transformPlace = function transformPlace({ src, target }) {
  const { migrationData: { name, group, id, parentId }, sourceData } = src

  target.attributes = {
    group,
    name,
  }

  target.id = id
  target.internals = {
    parentId,
  }
  target.meta = { sourceData }
}
