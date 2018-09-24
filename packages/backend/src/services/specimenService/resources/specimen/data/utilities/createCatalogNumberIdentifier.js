module.exports = function createCatalogNumberIdentifier({
  serviceInteractor,
  catalogNumber,
}) {
  return serviceInteractor
    .create({
      request: {
        body: {
          data: {
            attributes: {
              identifier: catalogNumber,
            },
          },
        },
      },

      resource: 'catalogNumber',
    })
    .then(({ data: catalogNumberIdentifier }) => {
      return catalogNumberIdentifier
    })
}
