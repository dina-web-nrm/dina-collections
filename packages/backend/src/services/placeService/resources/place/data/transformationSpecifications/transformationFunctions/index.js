/* eslint-disable no-param-reassign */

exports.transformPlace = function transformPlace({ src, target }) {
  const { name, group, id, parentId } = src

  target.attributes = {
    group,
    name,
  }

  target.id = id
  target.internals = {
    parentId,
  }
}
