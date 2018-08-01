module.exports = function getItemByTypeId({
  id,
  queryParams = {},
  report = true,
  reporter,
  resourceCacheMap,
  serviceInteractor,
  type,
}) {
  const cacheResource = resourceCacheMap && resourceCacheMap[type]
  if (cacheResource) {
    return serviceInteractor
      .getOne({
        request: {
          pathParams: {
            id,
          },
          queryParams,
        },
        resource: cacheResource,
      })
      .then(res => {
        if (reporter && report) {
          if (res && res.data) {
            reporter.increment({
              path: `dependencies.${cacheResource}.nHits`,
            })
          } else {
            reporter.increment({
              path: `dependencies.${cacheResource}.nMisses`,
            })
            reporter.increment({
              path: `dependencies.${cacheResource}.missing.${id}`,
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
        queryParams,
      },
      resource: type,
    })
    .then(res => {
      if (reporter && report) {
        if (res && res.data) {
          reporter.increment({
            path: `dependencies.${type}.nHits`,
          })
        } else {
          reporter.increment({
            path: `dependencies.${type}.nMisses`,
          })
          reporter.increment({
            path: `dependencies.${type}.missing.${id}`,
          })
        }
      }
      return (res && res.data) || null
    })
    .catch(err => {
      if (err.status === 404) {
        if (reporter && report) {
          reporter.increment({
            path: `dependencies.${type}.nMisses`,
          })
          reporter.increment({
            path: `dependencies.${type}.missing.${id}`,
          })
        }
        return null
      }

      throw err
    })
}
