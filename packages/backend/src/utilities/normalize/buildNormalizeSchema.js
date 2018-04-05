const uuidv1 = require('uuid/v4')
const { schema } = require('normalizr')
const models = require('common/dist/models.json')

const idAttribute = node => {
  if (node.id) {
    return node.id
  }

  if (node.lid) {
    return node.lid
  }
  return undefined
}

const processStrategy = node => {
  if (node.id || node.lid) {
    return node
  }
  node.lid = uuidv1() // eslint-disable-line no-param-reassign
  return node
}

const options = {
  idAttribute,
  processStrategy,
}

const getTypeAndRef = property => {
  if (!property) {
    return {}
  }

  if (property && property.$ref) {
    return {
      ref: property.$ref,
      type: 'object',
    }
  }

  if (property && property.items && property.items.$ref) {
    return {
      ref: property.items.$ref,
      type: 'array',
    }
  }

  return {}
}

module.exports = function buildNormalizeSchema(normalizedColumnNames) {
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
      if (!ref) {
        return obj
      }

      if (!schemas[ref] && !visited[ref]) {
        schemas[ref] = buildSchemas(ref)
      }
      if (!normalizedColumnNames.includes(ref)) {
        return obj
      }

      return {
        ...obj,
        [key]: type === 'object' ? schemas[ref] : [schemas[ref]],
      }
    }, {})

    return new schema.Entity(modelName, relations, options)
  }

  schemas.individualGroup = buildSchemas('individualGroup')
  return schemas
}
