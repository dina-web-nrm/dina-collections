/* eslint-disable no-param-reassign */

exports.transformStorageLocation = function transformStorageLocation({
  src,
  target,
}) {
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
