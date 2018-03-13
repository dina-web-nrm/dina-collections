const createArrayResponse = require('../../../lib/controllers/transformations/createArrayResponse')
const transformOutput = require('../../../lib/controllers/transformations/outputArray')

module.exports = function specimenGetWhere({ operation, models }) {
  const { resource } = operation
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
        .getWhere({
          where: {
            'document.individualGroup.taxonInformation.determinations.0.taxonNameStandardized': taxonNameStandardized,
          },
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
