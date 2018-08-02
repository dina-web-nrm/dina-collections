const migrator = require('common/src/migrator')
const getItemByTypeId = require('./getItemByTypeId')

module.exports = function applyTransformationFunctions({
  items,
  preTransformationFunction,
  postTransformationFunction,
  reporter,
  resolveRelations = false,
  resourceCacheMap,
  serviceInteractor,
  srcResource,
  startCount,
  transformationFunctions,
}) {
  if (reporter) {
    reporter.rebuildViewIncrementSrc({
      items,
    })
  }

  const wrappedGetItemByTypeId = ({ ...args }) => {
    return getItemByTypeId({
      reporter,
      resourceCacheMap,
      serviceInteractor,
      ...args,
    })
  }

  return preTransformationFunction({
    items,
    reporter,
    resolveRelations,
    resourceCacheMap,
    serviceInteractor,
    srcResource,
  }).then(nestedItems => {
    const promises = nestedItems.map((item, index) => {
      const globalIndex = startCount + index
      return migrator
        .applyTransformationFunctionsAsync({
          getItemByTypeId: wrappedGetItemByTypeId,
          globalIndex,
          index,
          item,
          migrator,
          reporter,
          serviceInteractor,
          transformationFunctions,
        })
        .then(mappedItem => {
          return mappedItem
        })
        .catch(err => {
          reporter.rebuildViewError({
            err,
            index: globalIndex,
          })

          return null
        })
    })
    return Promise.all(promises).then(transformedItems => {
      return postTransformationFunction({ items: transformedItems }).then(
        ({ items: postProcessedItems }) => {
          return postProcessedItems
        }
      )
    })
  })
}
