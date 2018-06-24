/* eslint-disable no-param-reassign */

exports.transformPlace = function transformPlace({ src, target }) {
  const { name, level, id, parentId } = src

  target.doc = {
    group: level === 'continentOcean' ? 'continent' : level,
    name,
  }

  target.id = id
  target.parentId = parentId
}
