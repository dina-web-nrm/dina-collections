const cloneObject = require('./utilities/cloneObject')
const getFormatSpecification = require('./getFormatSpecification')
const formatRelationshipsToApiFormat = require('./formatRelationshipsToApiFormat')
const normalizeItem = require('./normalizeItem')

module.exports = function toApiFormat({ type, rawItem }) {
  const formatSpecification = getFormatSpecification({ type })
  if (!formatSpecification) {
    throw new Error(
      `No formatSpecification available for item with type: ${type}`
    )
  }
  let item = cloneObject(rawItem)

  item = formatRelationshipsToApiFormat({
    formatSpecification,
    item,
  })

  item = normalizeItem({
    formatSpecification,
    item,
  })

  return item
}
