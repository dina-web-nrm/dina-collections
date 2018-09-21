module.exports = function createCatalogNumberIdentifier({ serviceInteractor }) {
  return serviceInteractor
    .call({
      operationId: 'catalogNumberGenerate',
      request: {
        body: {
          data: {},
        },
      },
    })
    .then(({ data: catalogNumberIdentifier }) => {
      return catalogNumberIdentifier
    })
}
