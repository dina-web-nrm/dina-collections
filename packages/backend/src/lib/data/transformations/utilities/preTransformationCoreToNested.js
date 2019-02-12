const coreToNested = require('common/src/formatObject/coreToNested')
const getItemByTypeId = require('./getItemByTypeId')

module.exports = function preTransformationCoreToNested({
  items,
  keepCoreRelationships = true,
  reporter,
  resolveRelations,
  resourceCacheMap,
  serviceInteractor,
  srcResource,
}) {
  if (!resolveRelations) {
    return Promise.resolve(items)
  }

  const resourceRelationsResourceMap =
    typeof resolveRelations === 'object' ? resolveRelations : {}

  return Promise.all(
    items.map(item => {
      return coreToNested({
        getItemByTypeId: resolveRelations
          ? (type, id) => {
              let queryParams = {}
              const resourceRelationships = resourceRelationsResourceMap[type]
              if (resourceRelationships) {
                queryParams = { relationships: resourceRelationships }
              }

              return getItemByTypeId({
                id,
                queryParams,
                reporter,
                resourceCacheMap,
                serviceInteractor,
                type,
              })
            }
          : null,
        item,
        type: srcResource,
      }).then(nestedItem => {
        if (keepCoreRelationships) {
          nestedItem.coreRelationships = item && item.relationships // eslint-disable-line
        }

        return nestedItem
      })
    })
  )
}
