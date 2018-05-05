const objectPath = require('object-path')
const walk = require('./walkObject')

const extractRelationship = ({ item, path, relationshipKey, type }) => {
  const segments = path.split('.*.')
  const relationships = []
  walk({
    func: pth => {
      const relationship = objectPath.get(item, pth)
      objectPath.set(item, pth, relationship.id)
      relationships.push(relationship)
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

module.exports = function extractRelationships({
  item,
  relationshipSpecification,
}) {
  let updatedItem = item
  Object.keys(relationshipSpecification).forEach(relationshipKey => {
    const { path, type } = relationshipSpecification[relationshipKey]

    updatedItem = extractRelationship({ item, path, relationshipKey, type })
  })

  return updatedItem
}
