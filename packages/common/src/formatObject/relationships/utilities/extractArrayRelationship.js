const extractArrayRelationship = ({
  item,
  nestedToCoreSync,
  relationshipKey,
  relationshipType,
}) => {
  if (!item[relationshipKey]) {
    return undefined
  }

  const relationshipArray = item[relationshipKey]
    .map(element => {
      return nestedToCoreSync
        ? nestedToCoreSync({
            item: element,
            normalize: true,
            type: relationshipType,
          })
        : element
    })
    .filter(element => !!element)

  return relationshipArray
}

module.exports = { extractArrayRelationship }
