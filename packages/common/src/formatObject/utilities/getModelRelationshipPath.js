module.exports = function getModelRelationshipPath(model) {
  if (!model) {
    return null
  }

  return model['x-path']
}
