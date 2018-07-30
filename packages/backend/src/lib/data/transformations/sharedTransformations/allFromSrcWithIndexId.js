const deleteNullProperties = require('common/src/deleteNullProperties')
/* eslint-disable no-param-reassign */

module.exports = function allFromSrcWithIndexId({ src, target, globalIndex }) {
  const { id, ...rest } = src
  target.attributes = deleteNullProperties(rest || {})
  target.id = `${globalIndex + 1}`
}
