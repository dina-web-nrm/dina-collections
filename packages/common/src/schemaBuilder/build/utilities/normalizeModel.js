const normalizeProperty = ({ normalize, property, incjetedNormalizeModel }) => {
  if (!property) {
    return property
  }

  let normalizedProperty = {
    ...property,
  }

  if (property.type === 'object' && normalizedProperty.properties) {
    return incjetedNormalizeModel({
      model: property,
      normalize,
    })
  }

  if (property.type === 'array' && normalizedProperty.items) {
    return {
      ...normalizedProperty,
      items: normalizeProperty({
        incjetedNormalizeModel,
        normalize,
        property: normalizedProperty.items,
      }),
    }
  }

  if (
    normalize &&
    property.$ref &&
    property['x-reference-type'] &&
    property['x-reference-type'] === 'external'
  ) {
    normalizedProperty = {
      ...property,
      $ref: '__ROOT__externalModelReference',
    }
  }

  if (
    normalize &&
    property.$ref &&
    property['x-reference-type'] &&
    property['x-reference-type'] === 'internal'
  ) {
    normalizedProperty = {
      $ref: '__ROOT__lid',
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
        incjetedNormalizeModel: normalizeModel,
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
