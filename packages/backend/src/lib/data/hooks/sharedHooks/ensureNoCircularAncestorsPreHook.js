const backendError400 = require('common/src/error/errorFactories/backendError400')

module.exports = function ensureNoCircularAncestorsPreHook({
  request,
  resource,
  serviceInteractor,
}) {
  return Promise.resolve().then(() => {
    const { body: { data }, pathParams: { id } } = request
    const parentId = data && data.id
    if (!parentId) {
      return null
    }

    return serviceInteractor
      .getMany({
        request: {
          queryParams: {
            filter: {
              ancestorsToId: parentId,
            },
          },
        },
        resource,
      })
      .then(({ data: ancestors }) => {
        ancestors.forEach(ancestor => {
          if (ancestor.id === id) {
            backendError400({
              code: 'REQUEST_ERROR',
              detail: `Circular dependency detected for id: ${id}`,
            })
          }
        })
      })
  })
}
