const objectPath = require('object-path')
const walk = require('../utilities/walkObject')
const createRelationshipIdMap = require('../utilities/createRelationshipIdMap')

module.exports = function resolveItemRelationship({
  getItemByTypeId,
  item,
  relationships,
  path,
  relationshipKey,
  type,
}) {
  const segments = path.split('.*.')
  const relationship = relationships[relationshipKey]
  if (!relationship) {
    return item
  }

  const relationshipIdMap = createRelationshipIdMap({
    relationship,
    type,
  })

  walk({
    func: pth => {
      const relationshipIdInObject = objectPath.get(item, pth).id
      const relationshipIdInObjectExistInRelationships =
        relationshipIdInObject && relationshipIdMap[relationshipIdInObject]

      const resolvedRelationshipItem =
        relationshipIdInObjectExistInRelationships &&
        getItemByTypeId &&
        getItemByTypeId(type, relationshipIdInObject)
      if (resolvedRelationshipItem) {
        // potentially remove type
        objectPath.set(item, pth, resolvedRelationshipItem)
      }
    },
    obj: item,
    segments,
  })

  return item
}
