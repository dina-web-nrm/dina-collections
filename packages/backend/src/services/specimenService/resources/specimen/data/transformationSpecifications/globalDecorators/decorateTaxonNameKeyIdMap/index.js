/* eslint-disable no-param-reassign */
const buildKey = require('./buildKey')

module.exports = function decorateTaxonNameKeyIdMap({
  serviceInteractor,
  globals,
}) {
  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          limit: 100000,
        },
      },
      resource: 'taxonName',
    })
    .then(({ data: taxonNames }) => {
      const taxonNameKeyIdMap = {}
      taxonNames.forEach(taxonName => {
        const key = buildKey({ taxonName })
        if (key) {
          if (taxonNameKeyIdMap[key]) {
            throw new Error(`Taxon name key duplicate: ${key}`)
          }
          taxonNameKeyIdMap[key] = taxonName.id
        }
      })

      globals.taxonNameKeyIdMap = taxonNameKeyIdMap
    })
}
