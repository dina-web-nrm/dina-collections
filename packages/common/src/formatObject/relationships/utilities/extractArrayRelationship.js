const extractArrayRelationship = ({
  item,
  relationshipKey,
  relationshipType,
}) => {
  if (!item[relationshipKey]) {
    return undefined
  }

  const relationshipArray = item[relationshipKey]
    .map(element => {
      return element && element.id
        ? { id: element.id, type: relationshipType }
        : null
    })
    .filter(element => !!element)

  return relationshipArray
}

module.exports = { extractArrayRelationship }
