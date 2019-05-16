module.exports = function createUpdateRelatedSearchResourcePostHook({
  srcResource,
  updateRelatedSearchResource,
}) {
  return function updateRelatedSearchResourcePostHook({
    item,
    serviceInteractor,
  }) {
    return updateRelatedSearchResource({
      item,
      serviceInteractor,
      srcResource,
    })
  }
}
