const objectPath = require('object-path')
const walk = require('../utilities/walkObject')
const createLid = require('../utilities/createLid')

module.exports = function extractItemRelationship({
  item,
  path,
  relationshipFormat,
  relationshipKey,
  relationshipType,
  nestedToCore,
}) {
  const segments = path.split('.*.')
  const relationships = []
  walk({
    func: pth => {
      const relationship = objectPath.get(item, pth)
      if (relationship.id === undefined) {
        relationship.lid = createLid()
      }

      const referense =
        relationship.id !== undefined
          ? {
              id: relationship.id,
            }
          : {
              lid: relationship.lid,
            }

      objectPath.set(item, pth, referense)

      const formattedRelationship = nestedToCore
        ? nestedToCore({
            item: relationship,
            normalize: true,
            type: relationshipType,
          })
        : relationship

      relationships.push(formattedRelationship)
    },
    obj: item,
    segments,
  })

  relationships.filter(relationship => {
    return !!relationship
  })

  if (relationships.length) {
    objectPath.set(
      item,
      `relationships.${relationshipKey}.data`,
      relationshipFormat === 'object' ? relationships[0] : relationships
    )
  }

  return item
}
