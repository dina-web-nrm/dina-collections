const immutable = require('object-path-immutable')
const objectPath = require('object-path')

module.exports = function extractFieldsFromItem({
  item,
  fields = [],
  excludeFieldsInput,
} = {}) {
  if (!(fields.length || excludeFieldsInput)) {
    return item
  }

  let returnItem = {}

  if (fields.length) {
    fields.forEach(fieldPath => {
      objectPath.set(returnItem, fieldPath, objectPath.get(item, fieldPath))
    })

    objectPath.set(returnItem, 'internals', objectPath.get(item, 'internals'))
    objectPath.set(returnItem, 'id', objectPath.get(item, 'id'))
  } else {
    returnItem = item
  }

  if (excludeFieldsInput) {
    excludeFieldsInput.forEach(fieldPath => {
      returnItem = immutable.del(returnItem, fieldPath)
    })
  }

  return returnItem
}
