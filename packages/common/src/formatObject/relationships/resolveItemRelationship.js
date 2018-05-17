const objectPath = require('object-path')
const walk = require('../utilities/walkObject')

module.exports = function resolveItemRelationship({
  coreToNested,
  getItemByTypeId,
  item,
  path,
  relationshipKey,
  relationships,
  type,
}) {
  const relationship = relationships[relationshipKey]
  if (!(relationship && relationship.data)) {
    return item
  }

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
          const id =
            relationshipObject &&
            (relationshipObject.id || relationshipObject.lid)
          // check that it exist in relationships
          const resolvedRelationshipItem =
            id && getItemByTypeId && getItemByTypeId(type, id)

          if (resolvedRelationshipItem) {
            objectPath.set(
              item,
              pth,
              coreToNested({
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

  if (Array.isArray(relationship.data)) {
    return {
      ...item,
      [relationshipKey]: relationship.data.map(({ id }) => {
        const resolvedRelationshipItem =
          id && getItemByTypeId && getItemByTypeId(type, id)
        if (resolvedRelationshipItem) {
          return coreToNested({
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
    relationshipItem = coreToNested({
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
