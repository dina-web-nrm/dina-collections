const createArrayResponse = require('../../../lib/api/utilities/createArrayResponse')
const transformOutput = require('../../../connectors/transformations/outputArray')

module.exports = function specimenGetWhere({
  modelName,
  resource: resourceInput,
}) {
  const resource = resourceInput || modelName
  return ({ models, request }) => {
    const {
      queryParams: { filter: { catalogNumber, taxonNameStandardized } = {} },
    } = request
    const model = models[modelName]

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
