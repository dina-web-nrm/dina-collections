const { schema } = require('normalizr')
const getIdAttribute = require('./getIdAttribute')
const getTypeAndRef = require('./getTypeAndRef')
const processStrategy = require('./processStrategy')
const models = require('../../../dist/models.json')

const options = {
  idAttribute: getIdAttribute,
  processStrategy,
}

module.exports = function buildNormalizeSchema({
  rootSchema,
  normalizedSchemaSpecification,
}) {
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
      const { ref, type } = getTypeAndRef(property)
      const { column, normalize } = normalizedSchemaSpecification[ref] || {}

      if (!column || normalize === false) {
        return obj
      }

      if (!schemas[column] && !visited[ref]) {
        schemas[column] = buildSchemas(ref)
      }

      return {
        ...obj,
        [key]: type === 'object' ? schemas[column] : [schemas[column]],
      }
    }, {})

    const { column: modelColumnName } =
      normalizedSchemaSpecification[modelName] || {}

    return new schema.Entity(modelColumnName || modelName, relations, options)
  }

  const { column: rootColumnName } =
    normalizedSchemaSpecification[rootSchema] || {}

  schemas[rootColumnName] = buildSchemas(rootSchema)
  return schemas
}
