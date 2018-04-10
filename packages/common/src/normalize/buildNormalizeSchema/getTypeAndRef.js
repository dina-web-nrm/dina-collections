module.exports = function getTypeAndRef(property) {
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
