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
    reporter.increment({
      count: items.length,
      path: 'transformations.nSrcItems',
    })
  }

  const wrappedGetItemByTypeId = ({ id, type }) => {
    return getItemByTypeId({
      id,
      reporter,
      resourceCacheMap,
      serviceInteractor,
      type,
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
          transformationFunctions,
        })
        .then(mappedItem => {
          return mappedItem
        })
    })
    return Promise.all(promises).then(transformedItems => {
      return postTransformationFunction({ items: transformedItems }).then(
        ({ items: postProcessedItems }) => {
          if (reporter) {
            reporter.increment({
              count: postProcessedItems.length,
              path: 'transformations.nTargetItems',
            })
          }
          return postProcessedItems
        }
      )
    })
  })
}
