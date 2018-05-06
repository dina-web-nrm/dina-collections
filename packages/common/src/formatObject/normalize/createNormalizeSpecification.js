const { schema } = require('normalizr')
const normalizrGetIdAttribute = require('../utilities/normalizrGetIdAttribute')
const normalizrProcessStrategy = require('../utilities/normalizrProcessStrategy')

const createKeyColumnMap = require('../utilities/createKeyColumnMap')
const getModelIsColumn = require('../utilities/getModelIsColumn')
const getModelFormat = require('../utilities/getModelFormat')
const getModelType = require('../utilities/getModelType')

const options = {
  idAttribute: normalizrGetIdAttribute,
  processStrategy: normalizrProcessStrategy,
}

module.exports = function createNormalizeSpecification({ modelKey, models }) {
  const baseModel = models[modelKey]

  const keyColumnMap = createKeyColumnMap(baseModel)

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
      const type = getModelType(property)
      const format = getModelFormat(property)
      const isColumn = getModelIsColumn(property)

      const column = keyColumnMap[type]
      if (!column) {
        return obj
      }

      if (!schemas[column] && !visited[type] && !isColumn) {
        schemas[column] = buildSchemas(type)
      }

      return {
        ...obj,
        [key]: format === 'object' ? schemas[column] : [schemas[column]],
      }
    }, {})

    const modelColumnName = keyColumnMap[modelName]
    return new schema.Entity(modelColumnName || modelName, relations, options)
  }

  schemas[modelKey] = buildSchemas(modelKey)
  return schemas
}
