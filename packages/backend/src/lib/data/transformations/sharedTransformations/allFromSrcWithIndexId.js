const createDeleteProperties = require('common/src/createDeleteProperties')

const deleteNullProperties = createDeleteProperties(null)

/* eslint-disable no-param-reassign */
module.exports = function allFromSrcWithIndexId({ src, target, globalIndex }) {
  const { id, ...rest } = src
  target.attributes = deleteNullProperties(rest || {})
  target.id = `${globalIndex + 1}`
}
