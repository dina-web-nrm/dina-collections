const objectPath = require('object-path')
const walk = require('../utilities/walkObject')

module.exports = function resolveItemRelationship({
  coreToNestedSync,
  getItemByTypeId,
  item,
  path,
  relationshipKey,
  relationships,
  type,
}) {
  if (path) {
    let arrayPath = path
    if (!Array.isArray(path)) {
      arrayPath = [path]
    }

    arrayPath.forEach(pathItem => {
      const segments = pathItem.split('.*.')

      walk({
        func: pth => {
          const relationshipObject = objectPath.get(item, pth)

          const id = relationshipObject && relationshipObject.id
          const lid = relationshipObject && relationshipObject.lid

          let resolvedRelationshipItem
          if (getItemByTypeId) {
            if (id === undefined && lid !== undefined) {
              const relationshipData =
                relationships[relationshipKey] &&
                relationships[relationshipKey].data
              const relationshipArray = Array.isArray(relationshipData)
                ? relationshipData
                : [relationshipData]

              resolvedRelationshipItem = relationshipArray
                .filter(relationshipDataItem => !!relationshipDataItem)
                .reduce((matching, { id: relationshipId }) => {
                  if (matching) {
                    return matching
                  }
                  const tmp = getItemByTypeId(type, relationshipId)
                  if (tmp && tmp.attributes && tmp.attributes.lid === lid) {
                    return tmp
                  }

                  return undefined
                }, undefined)
            } else {
              resolvedRelationshipItem =
                id && getItemByTypeId && getItemByTypeId(type, id)
            }
          }

          if (resolvedRelationshipItem) {
            objectPath.set(
              item,
              pth,
              coreToNestedSync({
                getItemByTypeId,
                item: resolvedRelationshipItem,
                type: resolvedRelationshipItem.type,
              })
            )
          }
        },
        obj: item,
        segments,
      })
    })

    return item
  }

  const relationship = relationships[relationshipKey]
  if (!(relationship && relationship.data)) {
    return item
  }

  if (Array.isArray(relationship.data)) {
    return {
      ...item,
      [relationshipKey]: relationship.data.map(({ id }) => {
        const resolvedRelationshipItem =
          id && getItemByTypeId && getItemByTypeId(type, id)
        if (resolvedRelationshipItem) {
          return coreToNestedSync({
            getItemByTypeId,
            item: resolvedRelationshipItem,
            type,
          })
        }
        return {
          id,
        }
      }),
    }
  }

  let relationshipItem

  const resolvedRelationshipItem =
    relationship.data.id &&
    getItemByTypeId &&
    getItemByTypeId(type, relationship.data.id)

  if (resolvedRelationshipItem) {
    relationshipItem = coreToNestedSync({
      getItemByTypeId,
      item: resolvedRelationshipItem,
      type,
    })
  } else {
    relationshipItem = {
      id: relationship.data.id,
    }
  }

  return {
    ...item,
    [relationshipKey]: relationshipItem,
  }
}
