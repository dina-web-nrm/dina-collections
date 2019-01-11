module.exports = function shouldModifyRelationship({
  resourcePath,
  relationshipsToModify = [],
  relationKey,
}) {
  if (relationshipsToModify.includes('all')) {
    return true
  }
  const relationshipPath = `${resourcePath}.${relationKey}`
  return relationshipsToModify.some(str => {
    return str.includes(relationshipPath)
  })
}
