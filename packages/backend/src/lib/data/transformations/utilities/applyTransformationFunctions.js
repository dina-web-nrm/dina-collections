const migrator = require('common/src/migrator')
const coreToNested = require('common/src/formatObject/coreToNested')

const getItemByTypeId = ({
  type,
  id,
  resourceCacheMap,
  serviceInteractor,
  reporter,
}) => {
  const cacheResource = resourceCacheMap && resourceCacheMap[type]
  if (cacheResource) {
    return serviceInteractor
      .getOne({
        request: {
          pathParams: {
            id,
          },
        },
        resource: cacheResource,
      })
      .then(res => {
        if (reporter) {
          if (res && res.data) {
            reporter.increment({
              path: `dependencies.${cacheResource}.nHits`,
            })
          } else {
            reporter.increment({
              path: `dependencies.${cacheResource}.nMisses`,
            })
          }
        }

        return (res && res.data) || null
      })
      .catch(err => {
        if (err.status === 404) {
          reporter.increment({
            path: `dependencies.${cacheResource}.nMisses`,
          })
          return null
        }

        throw err
      })
  }
  return serviceInteractor
    .getOne({
      request: {
        pathParams: {
          id,
        },
      },
      resource: type,
    })
    .then(res => {
      if (reporter) {
        if (res && res.data) {
          reporter.increment({
            path: `dependencies.${type}.nHits`,
          })
        } else {
          reporter.increment({
            path: `dependencies.${type}.nMisses`,
          })
        }
      }
      return (res && res.data) || null
    })
    .catch(err => {
      if (err.status === 404) {
        reporter.increment({
          path: `dependencies.${type}.nMisses`,
        })
        return null
      }

      throw err
    })
}

const preProcessItems = ({
  items,
  resolveRelations,
  reporter,
  resourceCacheMap,
  serviceInteractor,
  srcResource,
}) => {
  if (!resolveRelations) {
    return Promise.resolve(items)
  }
  return Promise.all(
    items.map(item => {
      return coreToNested({
        getItemByTypeId: (type, id) => {
          return getItemByTypeId({
            id,
            reporter,
            resourceCacheMap,
            serviceInteractor,
            type,
          })
        },
        item,
        type: srcResource,
      })
    })
  )
}

module.exports = function applyTransformationFunctions({
  items,
  resolveRelations = false,
  reporter,
  resourceCacheMap,
  serviceInteractor,
  srcResource,
  startCount,
  transformationFunctions,
}) {
  return preProcessItems({
    items,
    reporter,
    resolveRelations,
    resourceCacheMap,
    serviceInteractor,
    srcResource,
  }).then(nestedItems => {
    return nestedItems.map((item, index) => {
      const globalIndex = startCount + index
      const mappedItem = migrator.applyTransformationFunctions({
        globalIndex,
        index,
        item,
        migrator,
        reporter,
        transformationFunctions,
      })

      if (reporter) {
        reporter.increment({
          path: 'migrations.nItems',
        })
      }
      return mappedItem
    })
  })
}
