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
  const segments = path.split('.*.')
  const relationship = relationships[relationshipKey]
  if (!relationship) {
    return item
  }

  walk({
    func: pth => {
      const relationshipObject = objectPath.get(item, pth)
      const id =
        relationshipObject && (relationshipObject.id || relationshipObject.lid)

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

  return item
}
