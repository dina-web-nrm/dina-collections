/* eslint-disable no-param-reassign */

exports.transformStorageLocation = function transformStorageLocation({
  src,
  target,
}) {
  const { name, level, id, parentId } = src

  target.doc = {
    group: level === 'continentOcean' ? 'continent' : level,
    name,
  }

  target.id = id
  target.parentId = parentId
}
