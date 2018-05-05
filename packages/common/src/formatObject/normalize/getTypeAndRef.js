module.exports = function getTypeAndRef(property) {
  if (!property) {
    return {}
  }

  if (property && property.$ref) {
    return {
      isColumn: property['x-column'],
      normalize: !!property['x-column'],
      ref: property.$ref,
      type: 'object',
    }
  }

  if (property && property.items && property.items.$ref) {
    return {
      isColumn: property['x-column'],
      ref: property.items.$ref,
      type: 'array',
    }
  }

  return {}
}
