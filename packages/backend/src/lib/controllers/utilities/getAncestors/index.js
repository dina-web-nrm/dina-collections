const extractRelationships = require('../relationships/extractRelationships')

module.exports = function getAncestors({
  id,
  include,
  includeRelations,
  model,
  queryParamRelationships,
  relations,
}) {
  const fetchedIds = {}

  const ancestors = []

  const fetchAncestors = ancestorId => {
    return model
      .getById({
        id: ancestorId,
        include,
      })
      .then(({ item }) => {
        if (!item) {
          return null
        }
        const relationships =
          includeRelations &&
          extractRelationships({
            item,
            queryParamRelationships,
            relations,
          })

        const parent =
          relationships && relationships.parent && relationships.parent.data
        if (parent && parent.id) {
          if (fetchedIds[parent.id]) {
            throw new Error(`Recursion for id: ${parent.id}`)
          }

          fetchedIds[parent.id] = true
          ancestors.push(parent)
          return fetchAncestors(parent.id)
        }
        return null
      })
  }

  return fetchAncestors(id)
    .then(() => {
      return {
        items: ancestors,
        meta: {},
      }
    })
    .catch(() => {
      return {
        items: ancestors,
        meta: {},
      }
    })
}
