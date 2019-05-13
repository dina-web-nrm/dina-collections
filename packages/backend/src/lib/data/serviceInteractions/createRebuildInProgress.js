module.exports = function createRebuildInProgress({ operationId }) {
  return function rebuildInProgress({ serviceInteractor }) {
    return serviceInteractor
      .call({
        operationId,
      })
      .then(({ data }) => {
        return !!data.attributes.nextVersion
      })
  }
}
