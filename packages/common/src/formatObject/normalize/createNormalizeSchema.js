const { schema } = require('normalizr')
const getIdAttribute = require('./getIdAttribute')
const getTypeAndRef = require('./getTypeAndRef')
const processStrategy = require('./processStrategy')

const options = {
  idAttribute: getIdAttribute,
  processStrategy,
}

module.exports = function createNormalizeSchema({ modelKey, models }) {
  const baseModel = models[modelKey]

  const keyColumnMap = Object.keys(baseModel.properties).reduce(
    (map, propertyKey) => {
      const property = baseModel.properties[propertyKey]

      if (!property['x-column']) {
        return map
      }

      const { ref } = getTypeAndRef(property)

      return {
        ...map,
        [ref]: property['x-column'],
      }
    },
    {}
  )

  const schemas = {}
  const visited = {}

  const buildSchemas = modelName => {
    visited[modelName] = true
    const model = models[modelName]
    if (!model) {
      throw new Error(`Cant find model with name: ${modelName}`)
    }
    const { properties } = model
    const relations = Object.keys(properties).reduce((obj, key) => {
      const property = properties[key]
      const { ref, type, isColumn } = getTypeAndRef(property)

      const column = keyColumnMap[ref]
      if (!column) {
        return obj
      }

      if (!schemas[column] && !visited[ref] && !isColumn) {
        schemas[column] = buildSchemas(ref)
      }

      return {
        ...obj,
        [key]: type === 'object' ? schemas[column] : [schemas[column]],
      }
    }, {})

    const modelColumnName = keyColumnMap[modelName]
    return new schema.Entity(modelColumnName || modelName, relations, options)
  }

  schemas[modelKey] = buildSchemas(modelKey)
  return schemas
}
