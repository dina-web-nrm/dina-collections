const createArrayResponse = require('../../../lib/controllers/transformations/createArrayResponse')
const transformOutput = require('../../../lib/controllers/transformations/outputArray')

module.exports = function specimenGetWhere({ connectorOptions, models }) {
  const { resource } = connectorOptions
  return ({ request }) => {
    const {
      queryParams: { filter: { catalogNumber, taxonNameStandardized } = {} },
    } = request
    const model = models[resource]

    if (catalogNumber) {
      return model
        .getOneWhere({
          where: {
            'document.individualGroup.identifiers.0.identifier.value': catalogNumber,
          },
        })
        .then(item => {
          return [item]
        })
        .then(transformOutput)
        .then(items => {
          return createArrayResponse({
            items,
            type: resource,
          })
        })
    }
    if (taxonNameStandardized) {
      return model
        .getAllByTaxonName({
          taxonName: taxonNameStandardized,
        })
        .then(transformOutput)
        .then(items => {
          return createArrayResponse({
            items,
            type: resource,
          })
        })
    }
    return model
      .getWhere({ where: {} })
      .then(transformOutput)
      .then(items => {
        return createArrayResponse({
          items,
          type: resource,
        })
      })
  }
}
