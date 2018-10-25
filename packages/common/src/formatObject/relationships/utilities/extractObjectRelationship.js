const extractObjectRelationship = ({
  item,
  nestedToCoreSync,
  relationshipKey,
  relationshipType,
}) => {
  if (item[relationshipKey] === null) {
    return null
  }

  if (!item[relationshipKey]) {
    return undefined
  }

  return nestedToCoreSync
    ? nestedToCoreSync({
        item: item[relationshipKey],
        normalize: true,
        type: relationshipType,
      })
    : item[relationshipKey]
}

module.exports = { extractObjectRelationship }
