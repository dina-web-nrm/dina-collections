const { normalize } = require('normalizr')
const columnObjectToArray = require('./columnObjectToArray')

module.exports = function normalizeItem({
  item,
  normalizeSpecification,
  type,
}) {
  const schema = normalizeSpecification
  const columnNames = Object.keys(schema)
  const normalizedData = normalize(item, schema[type])
  const { entities } = normalizedData
  const data = Object.keys(entities).reduce(
    (obj, columnName) => {
      if (columnName === type) {
        const entry = entities[columnName]
        const id = Object.keys(entry)[0]
        return {
          ...obj,
          ...entities[columnName][id],
        }
      }
      if (!columnNames.includes(columnName)) {
        return {
          ...obj,
          [columnName]: entities[columnName],
        }
      }

      return {
        ...obj,
        normalized: {
          ...obj.normalized,
          [columnName]: columnObjectToArray(entities[columnName]),
        },
      }
    },
    { normalized: {} }
  )
  return data
}
