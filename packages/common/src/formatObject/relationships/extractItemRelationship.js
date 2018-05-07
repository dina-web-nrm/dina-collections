const objectPath = require('object-path')
const walk = require('../utilities/walkObject')

module.exports = function extractItemRelationship({
  item,
  path,
  relationshipFormat,
  relationshipKey,
  relationshipType,
  toCoreFormat,
}) {
  const segments = path.split('.*.')
  const relationships = []
  walk({
    func: pth => {
      const relationship = objectPath.get(item, pth)
      objectPath.set(item, pth, {
        id: relationship.id,
      })

      const formattedRelationship = toCoreFormat
        ? toCoreFormat({
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
