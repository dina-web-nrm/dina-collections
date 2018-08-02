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
            reporter.rebuildViewLookupHit({ resource: cacheResource })
          } else {
            reporter.rebuildViewLookupMiss({ id, resource: cacheResource })
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
          reporter.rebuildViewLookupHit({ resource: type })
        } else {
          reporter.rebuildViewLookupMiss({ id, resource: type })
        }
      }
      return (res && res.data) || null
    })
    .catch(err => {
      if (err.status === 404) {
        if (reporter && report) {
          reporter.rebuildViewLookupMiss({ id, resource: type })
        }
        return null
      }

      throw err
    })
}
