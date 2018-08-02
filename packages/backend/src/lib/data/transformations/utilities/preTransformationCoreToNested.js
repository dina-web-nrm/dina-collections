const coreToNested = require('common/src/formatObject/coreToNested')
const getItemByTypeId = require('./getItemByTypeId')

module.exports = function preTransformationCoreToNested({
  items,
  resolveRelations,
  reporter,
  resourceCacheMap,
  serviceInteractor,
  srcResource,
}) {
  if (!resolveRelations) {
    return Promise.resolve(items)
  }

  return Promise.all(
    items.map(item => {
      return coreToNested({
        getItemByTypeId: resolveRelations
          ? (type, id) => {
              return getItemByTypeId({
                id,
                reporter,
                resourceCacheMap,
                serviceInteractor,
                type,
              })
            }
          : null,
        item,
        type: srcResource,
      })
    })
  )
}
