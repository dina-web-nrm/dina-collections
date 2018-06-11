const extractObjectRelationship = ({
  item,
  relationshipKey,
  relationshipType,
}) => {
  if (item[relationshipKey] === null) {
    return null
  }

  return item[relationshipKey] && item[relationshipKey].id
    ? { id: item[relationshipKey].id, type: relationshipType }
    : undefined
}

module.exports = { extractObjectRelationship }
