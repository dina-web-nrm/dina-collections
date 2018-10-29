const objectPath = require('object-path')

exports.clearAcceptedToTaxon = ({ request, serviceInteractor }) => {
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

exports.clearSynonymToTaxon = ({ request, serviceInteractor }) => {
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

const findAndClearTaxonRelationship = ({
  relationshipKey,
  serviceInteractor,
  taxonId,
}) => {
  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          filter: {
            [`${relationshipKey}Id`]: `${taxonId}`,
          },
        },
      },
      resource: 'taxonName',
    })
    .then(({ data: taxonNames }) => {
      if (taxonNames && taxonNames.length) {
        return Promise.all(
          taxonNames
            .map(taxonName => {
              if (taxonName && taxonName.id) {
                const { id } = taxonName

                return serviceInteractor.update({
                  request: {
                    body: {
                      data: {
                        id,
                        relationships: {
                          [relationshipKey]: {
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

              return null
            })
            .filter(promise => !!promise)
        )
      }

      return null
    })
}

exports.clearOtherTaxonNamesFromTaxon = ({ request, serviceInteractor }) => {
  const { body: { data } } = request
  const taxonId = objectPath.get(data, 'id')

  if (!taxonId) {
    return null
  }

  return Promise.all([
    findAndClearTaxonRelationship({
      relationshipKey: 'acceptedToTaxon',
      serviceInteractor,
      taxonId,
    }),
    findAndClearTaxonRelationship({
      relationshipKey: 'synonymToTaxon',
      serviceInteractor,
      taxonId,
    }),
  ])
}
