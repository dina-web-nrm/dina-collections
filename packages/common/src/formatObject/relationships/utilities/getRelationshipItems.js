const removeFalsyElements = element => !!element
const createGetItemFromRawItemId = ({
  getItemByTypeId,
  relationshipKey,
  type,
}) => {
  return rawItem => {
    return Promise.resolve().then(() => {
      if (!rawItem || !rawItem.id) {
        return undefined
      }

      return getItemByTypeId(type, rawItem.id, { relationshipKey })
    })
  }
}

const getRelationshipItems = ({
  getItemByTypeId,
  relationshipKey,
  relationships,
  type,
}) => {
  return Promise.resolve().then(() => {
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

    const getItemPromiseFromRawItem = createGetItemFromRawItemId({
      getItemByTypeId,
      relationshipKey,
      type,
    })

    return Promise.all(
      relationshipArray
        .filter(removeFalsyElements)
        .map(getItemPromiseFromRawItem)
    ).then(relationshipItems => {
      return relationshipItems.filter(removeFalsyElements)
    })
  })
}

module.exports = {
  createGetItemFromRawItemId,
  getRelationshipItems,
  removeFalsyElements,
}
