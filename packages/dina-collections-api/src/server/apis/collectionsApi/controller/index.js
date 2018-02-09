const transformInput = require('./transformInput')
const transformInputSearch = require('./transformInputSearch')
const transformOutput = require('./transformOutput')
const transformOutputArray = require('./transformOutputArray')
const validateQueryInput = require('./validateQueryInput')

module.exports = function individualGroupController({ models }) {
  // add custom validation to ensure only reference to curatedLocalities are added

  const create = ({ data }) => {
    return models.individualGroup
      .create(transformInput(data))
      .then(transformOutput)
  }

  const getByQueryParams = ({ queryParams }) => {
    validateQueryInput(queryParams)
    const {
      catalogNumber,
      identifiedTaxonNameStandardized,
    } = transformInputSearch(queryParams)
    if (catalogNumber) {
      // some inner join raw query is required
      return models.individualGroup
        .getOneWhere({
          where: {
            'document.physicalUnits.0.catalogedUnit.catalogNumber': catalogNumber,
          },
        })
        .then(result => {
          return transformOutputArray([result])
        })
    }

    if (identifiedTaxonNameStandardized) {
      return models.individualGroup
        .getAllByTaxonName({
          taxonName: identifiedTaxonNameStandardized,
        })
        .then(transformOutputArray)
    }

    throw new Error('Not implemented')
  }

  const update = ({ id, data }) => {
    return models.individualGroup
      .update({
        doc: transformInput(data),
        id,
      })
      .then(transformOutput)
  }

  return {
    create,
    getByQueryParams,
    update,
  }
}
