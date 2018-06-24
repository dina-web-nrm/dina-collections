const deleteNullProperties = require('common/src/deleteNullProperties')
/* eslint-disable no-param-reassign */

module.exports = function allFromObjectWithComputedId({
  src,
  target,
  globalIndex,
}) {
  const { id, ...rest } = src
  const doc = deleteNullProperties(rest || {})
  Object.keys(doc).forEach(key => {
    target[key] = doc[key]
  })

  target.id = `${globalIndex + 1}`
}
