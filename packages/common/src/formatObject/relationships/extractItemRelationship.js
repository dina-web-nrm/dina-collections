const objectPath = require('object-path')
const walk = require('./walkObject')

module.exports = function extractItemRelationship({
  item,
  path,
  relationshipKey,
  type,
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
            type,
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
    type === 'object' ? relationships[0] : relationships
  )

  return item
}
