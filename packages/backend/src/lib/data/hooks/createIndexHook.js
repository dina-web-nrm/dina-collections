module.exports = function createIndexHook({
  createIndexJob,
  rebuildInProgress,
  resource,
}) {
  return function indexHook({ item, serviceInteractor }) {
    return Promise.resolve().then(() => {
      const id = item && item.id
      if (id === undefined) {
        return null
      }
      const request = {
        body: {
          data: {
            attributes: {
              ids: [id],
            },
          },
        },
      }
      return serviceInteractor
        .updateView({
          request,
          resource,
        })
        .then(() => {
          return rebuildInProgress({ serviceInteractor }).then(inProgress => {
            if (!inProgress) {
              return null
            }
            return createIndexJob({
              consolidateJobs: false,
              ids: [id],
              priority: 1,
              serviceInteractor,
            })
          })
        })
    })
  }
}
