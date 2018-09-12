const removeFalsyElements = element => !!element
const createGetItemFromRawItemId = ({
  getItemByTypeId,
  relationshipKey,
  type,
}) => {
  return rawItem => {
    if (!rawItem || !rawItem.id) {
      return undefined
    }

    return getItemByTypeId(type, rawItem.id, { relationshipKey })
  }
}

const getRelationshipItemsSync = ({
  getItemByTypeId,
  relationshipKey,
  relationships,
  type,
}) => {
  if (!getItemByTypeId) {
    throw new Error('missing getItemByTypeId')
  }

  if (!type) {
    throw new Error('missing type')
  }

  const relationshipData =
    relationships[relationshipKey] && relationships[relationshipKey].data

  if (!relationshipData) {
    return []
  }

  const relationshipArray = Array.isArray(relationshipData)
    ? relationshipData
    : [relationshipData]

  const getItemFromRawItem = createGetItemFromRawItemId({
    getItemByTypeId,
    relationshipKey,
    type,
  })

  return relationshipArray
    .filter(removeFalsyElements)
    .map(getItemFromRawItem)
    .filter(removeFalsyElements)
}

module.exports = {
  createGetItemFromRawItemId,
  getRelationshipItemsSync,
  removeFalsyElements,
}
