const getModelIsColumn = require('./getModelIsColumn')
const getModelType = require('./getModelType')
const getModelColumn = require('./getModelColumn')

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
