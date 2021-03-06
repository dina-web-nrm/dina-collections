const migrator = require('common/src/migrator')
const getItemByTypeId = require('./getItemByTypeId')

module.exports = function applyTransformationFunctions({
  globals,
  items,
  postTransformationFunction,
  preTransformationFunction,
  reporter,
  resolveRelations = false,
  resourceCacheMap,
  serviceInteractor,
  srcResource,
  startCount,
  throwError = false,
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
          globals,
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
          if (throwError) {
            throw err
          }
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
