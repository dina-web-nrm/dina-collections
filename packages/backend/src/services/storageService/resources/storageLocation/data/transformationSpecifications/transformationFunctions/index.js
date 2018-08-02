/* eslint-disable no-param-reassign */

exports.transformStorageLocation = function transformStorageLocation({
  src,
  target,
}) {
  const { name, level, id, parentId } = src

  target.attributes = {
    group: level === 'continentOcean' ? 'continent' : level,
    name,
  }

  target.id = id
  target.internals = {
    parentId,
  }
}
