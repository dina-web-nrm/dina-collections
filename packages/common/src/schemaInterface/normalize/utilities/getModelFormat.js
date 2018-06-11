module.exports = function getModelFormat(model) {
  if (!model) {
    return null
  }

  if (model && (model.$ref || model.type === 'object')) {
    return 'object'
  }

  if (model && ((model.items && model.items.$ref) || model.type === 'array')) {
    return 'array'
  }

  return null
}
