const normalizeProperty = ({ normalize, property, injectedNormalizeModel }) => {
  if (!property) {
    return property
  }

  const normalizedProperty = {
    ...property,
  }

  if (property.type === 'object' && normalizedProperty.properties) {
    return injectedNormalizeModel({
      model: property,
      normalize,
    })
  }

  if (property.type === 'array' && normalizedProperty.items) {
    return {
      ...normalizedProperty,
      items: normalizeProperty({
        injectedNormalizeModel,
        normalize,
        property: normalizedProperty.items,
      }),
    }
  }

  if (normalizedProperty['x-reference-type']) {
    delete normalizedProperty['x-reference-type']
  }
  return normalizedProperty
}

function normalizeModel({ model, normalize }) {
  const { properties } = model || {}

  const normalizedProperties = Object.keys(properties).reduce((obj, key) => {
    const property = properties[key]
    return {
      ...obj,
      [key]: normalizeProperty({
        injectedNormalizeModel: normalizeModel,
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

module.exports = normalizeModel
