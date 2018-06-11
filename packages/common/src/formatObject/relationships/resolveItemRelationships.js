const resolveItemRelationship = require('./resolveItemRelationship')

module.exports = function resolveItemRelationships({
  coreToNested,
  getItemByTypeId,
  item,
  relationships = {},
  relationshipSpecification,
}) {
  return Promise.resolve().then(() => {
    return Promise.all(
      Object.keys(relationshipSpecification).map(relationshipKey => {
        const { path, targetResource: type } = relationshipSpecification[
          relationshipKey
        ]

        return Promise.resolve(
          resolveItemRelationship({
            coreToNested,
            getItemByTypeId,
            item,
            path,
            relationshipKey,
            relationships,
            type,
          })
        )
      })
    ).then(() => {
      return item
    })
  })
}
