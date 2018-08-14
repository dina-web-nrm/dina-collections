module.exports = function getItemByTypeId({
  id,
  queryParams = {},
  report = true,
  reportHitId = false,
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
            reporter.rebuildViewLookupHit({
              id: reportHitId ? id : undefined,
              resource: cacheResource,
            })
          } else {
            reporter.rebuildViewLookupMiss({ id, resource: cacheResource })
          }
        }

        return (res && res.data) || null
      })
      .catch(err => {
        if (err.status === 404) {
          reporter.rebuildViewLookupMiss({ resource: cacheResource })
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
          reporter.rebuildViewLookupHit({
            id: reportHitId ? id : undefined,
            resource: type,
          })
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
