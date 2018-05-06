const getModelIsColumn = require('./getModelIsColumn')
const getModelType = require('./getModelType')
const getModelColumn = require('./getModelColumn')

module.exports = function createKeyColumnMap(model) {
  return Object.keys(model.properties).reduce((map, propertyKey) => {
    const property = model.properties[propertyKey]

    if (!getModelIsColumn(property)) {
      return map
    }
    const type = getModelType(property)

    return {
      ...map,
      [type]: getModelColumn(property),
    }
  }, {})
}
