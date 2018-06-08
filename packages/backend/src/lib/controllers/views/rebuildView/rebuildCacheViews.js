module.exports = function rebuildCacheViews({ views = [], serviceInteractor }) {
  const promises = views.map(viewName => {
    return serviceInteractor.rebuildView({
      resource: viewName,
    })
  })

  return Promise.all(promises)
}
