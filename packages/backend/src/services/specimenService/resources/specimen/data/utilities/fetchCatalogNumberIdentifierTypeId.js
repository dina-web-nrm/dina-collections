const backendError500 = require('common/src/error/errorFactories/backendError500')

module.exports = function fetchCatalogNumberIdentifierTypeId({
  serviceInteractor,
}) {
  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          filter: {
            key: 'catalog-number',
          },
        },
      },

      resource: 'identifierType',
    })
    .then(({ data: catalogNumberIdentifierTypes }) => {
      if (catalogNumberIdentifierTypes.length !== 1) {
        backendError500({
          code: 'INTERNAL_SERVER_ERROR',
          detail: 'Catalog number identifier not found',
        })
      }
      return catalogNumberIdentifierTypes[0].id
    })
}
