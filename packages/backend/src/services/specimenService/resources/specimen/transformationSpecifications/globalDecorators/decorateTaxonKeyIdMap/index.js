const objectPath = require('object-path')

/* eslint-disable no-param-reassign */
const buildKey = require('./buildKey')

module.exports = function decorateTaxonKeyIdMap({
  serviceInteractor,
  globals,
}) {
  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          limit: 100000,
          relationships: ['acceptedTaxonName'],
        },
      },
      resource: 'taxon',
    })
    .then(({ data: taxa }) => {
      const taxonKeyIdMap = {}

      const taxonNamePromises = taxa.map(taxon => {
        const acceptedTaxonNameId = objectPath.get(
          taxon,
          'relationships.acceptedTaxonName.data.id'
        )

        if (!acceptedTaxonNameId) {
          return null
        }

        return serviceInteractor
          .getOne({
            request: {
              pathParams: {
                id: acceptedTaxonNameId,
              },
            },
            resource: 'taxonName',
          })
          .then(taxonName => {
            const name = objectPath.get(taxonName, 'data.attributes.name')
            const rank = objectPath.get(taxonName, 'data.attributes.rank')
            const key = buildKey({ name, rank })

            if (key) {
              if (taxonKeyIdMap[key]) {
                throw new Error(`Taxon name key duplicate: ${key}`)
              }
              taxonKeyIdMap[key] = taxon.id
            }

            return taxonName
          })
      })

      return Promise.all(taxonNamePromises).then(() => {
        globals.taxonKeyIdMap = taxonKeyIdMap
      })
    })
}
