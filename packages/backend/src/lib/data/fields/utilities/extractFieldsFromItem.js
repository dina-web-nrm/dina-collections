const objectPath = require('object-path')

module.exports = function extractFieldsFromItem({ item, fields } = {}) {
  if (!(fields && fields.length)) {
    return item
  }

  const returnItem = {}

  fields.forEach(fieldPath => {
    objectPath.set(returnItem, fieldPath, objectPath.get(item, fieldPath))
  })

  objectPath.set(returnItem, 'internals', objectPath.get(item, 'internals'))
  objectPath.set(returnItem, 'id', objectPath.get(item, 'id'))

  return returnItem
}
