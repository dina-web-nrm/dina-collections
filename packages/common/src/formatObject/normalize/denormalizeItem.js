const { denormalize } = require('normalizr')
const columnArrayToObject = require('./columnArrayToObject')

module.exports = function denormalizeItem({
  item,
  normalizeSpecification,
  type,
}) {
  const { normalized, ...rest } = item
  const schema = normalizeSpecification
  const entities = Object.keys(normalized || {}).reduce((obj, columnName) => {
    return {
      ...obj,
      [columnName]: columnArrayToObject(normalized[columnName]),
    }
  }, {})
  return denormalize(rest, schema[type], entities)
}
