const getModelIsColumn = require('./utilities/getModelIsColumn')
const getModelType = require('./utilities/getModelType')
const getModelColumn = require('./utilities/getModelColumn')

module.exports = function createKeyColumnMap(model) {
  const normalizedNamespaceProperties =
    (model &&
      model.properties &&
      model.properties.normalized &&
      model.properties.normalized.properties) ||
    {}

  return Object.keys(normalizedNamespaceProperties).reduce(
    (map, propertyKey) => {
      const property = normalizedNamespaceProperties[propertyKey]

      if (!getModelIsColumn(property)) {
        return map
      }
      const type = getModelType(property)

      return {
        ...map,
        [type]: getModelColumn(property),
      }
    },
    {}
  )
}
