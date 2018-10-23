const objectPath = require('object-path')

const clearAcceptedToTaxon = ({ request, serviceInteractor }) => {
  const { body: { data }, pathParams: { id } } = request
  const taxonId = objectPath.get(data, 'id')

  if (!taxonId) {
    return null
  }

  return serviceInteractor.update({
    request: {
      body: {
        data: {
          id,
          relationships: {
            acceptedToTaxon: {
              data: null,
            },
          },
        },
      },
      pathParams: { id },
    },
    resource: 'taxonName',
  })
}

const clearSynonymToTaxon = ({ request, serviceInteractor }) => {
  const { body: { data }, pathParams: { id } } = request
  const taxonId = objectPath.get(data, 'id')

  if (!taxonId) {
    return null
  }

  return serviceInteractor.update({
    request: {
      body: {
        data: {
          id,
          relationships: {
            synonymToTaxon: {
              data: null,
            },
          },
        },
      },
      pathParams: { id },
    },
    resource: 'taxonName',
  })
}

exports.clearAcceptedToTaxon = [clearAcceptedToTaxon]
exports.clearSynonymToTaxon = [clearSynonymToTaxon]
