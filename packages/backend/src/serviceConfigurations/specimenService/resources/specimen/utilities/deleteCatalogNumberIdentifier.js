module.exports = function createCatalogNumberIdentifier({
  catalogNumberIdentifier,
  serviceInteractor,
}) {
  const { id } = catalogNumberIdentifier
  return serviceInteractor.del({
    request: {
      pathParams: {
        id,
      },
    },

    resource: 'catalogNumber',
  })
}
