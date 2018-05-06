const objectPath = require('object-path')
const walk = require('../utilities/walkObject')

module.exports = function extractItemRelationship({
  item,
  path,
  relationshipFormat,
  relationshipKey,
  relationshipType,
  toApiFormat,
}) {
  const segments = path.split('.*.')
  const relationships = []
  walk({
    func: pth => {
      const relationship = objectPath.get(item, pth)
      objectPath.set(item, pth, {
        id: relationship.id,
      })

      const formattedRelationship = toApiFormat
        ? toApiFormat({
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

  objectPath.set(
    item,
    `relationships.${relationshipKey}.data`,
    relationshipFormat === 'object' ? relationships[0] : relationships
  )

  return item
}
