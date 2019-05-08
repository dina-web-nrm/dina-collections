const interpolate = require('../utilities/interpolate')

const normalizeProperty = ({ normalize, property, injectedAddRootToRefs }) => {
  if (!property) {
    return property
  }

  let updatedProperty = {
    ...property,
  }

  if (property.type === 'object' && updatedProperty.properties) {
    return injectedAddRootToRefs({
      model: property,
      normalize,
    })
  }

  if (property.type === 'array' && updatedProperty.items) {
    return {
      ...updatedProperty,
      items: normalizeProperty({
        injectedAddRootToRefs,
        normalize,
        property: updatedProperty.items,
      }),
    }
  }

  if (normalize && property.$ref) {
    if (property.$ref.indexOf('__ROOT__') === -1) {
      updatedProperty = {
        ...property,
        $ref: `__ROOT__${property.$ref}`,
      }
    }
  }

  return updatedProperty
}

function addRootToRefs({ model, normalize }) {
  const { properties } = model || {}

  const normalizedProperties = Object.keys(properties).reduce((obj, key) => {
    const property = properties[key]
    return {
      ...obj,
      [key]: normalizeProperty({
        injectedAddRootToRefs: addRootToRefs,
        normalize,
        property,
      }),
    }
  }, properties)

  return {
    ...model,
    properties: normalizedProperties,
  }
}

function setupRefs({ model, modelKey, normalize, referencePath }) {
  const modelWithRootInRefs = addRootToRefs({ model, normalize })
  return interpolate(
    {
      ...modelWithRootInRefs,
      description: modelWithRootInRefs.description || '',
      id: modelKey,
    },
    '__ROOT__',
    referencePath
  )
}

module.exports = setupRefs
