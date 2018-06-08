module.exports = function warm({ views = [], serviceInteractor }) {
  const promises = views.map(viewName => {
    return serviceInteractor.rebuildView({
      resource: viewName,
    })
  })

  return Promise.all(promises)
}
