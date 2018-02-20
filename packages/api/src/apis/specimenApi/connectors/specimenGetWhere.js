const createArrayResponse = require('../../../lib/api/utilities/createArrayResponse')
const transformOutput = require('../../../connectors/transformations/outputArray')

module.exports = function specimenGetWhere({
  modelName,
  resource: resourceInput,
}) {
  const resource = resourceInput || modelName
  return ({ models, request }) => {
    const {
      queryParams: { catalogNumber, identifiedTaxonNameStandardized } = {},
    } = request

    const model = models[modelName]

    if (catalogNumber) {
      return model
        .getOneWhere({
          where: {
            'document.physicalUnits.0.catalogedUnit.catalogNumber': catalogNumber,
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

    return model
      .getAllByTaxonName({
        taxonName: identifiedTaxonNameStandardized,
      })
      .then(transformOutput)
      .then(items => {
        return createArrayResponse({
          items,
          type: resource,
        })
      })
  }
}
