module.exports = function emptyCacheViews({ views = [], serviceInteractor }) {
  const promises = views.map(viewName => {
    return serviceInteractor.emptyView({
      resource: viewName,
    })
  })

  return Promise.all(promises)
}
