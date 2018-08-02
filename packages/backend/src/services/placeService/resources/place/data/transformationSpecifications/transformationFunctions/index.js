/* eslint-disable no-param-reassign */

exports.transformPlace = function transformPlace({ src, target }) {
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
