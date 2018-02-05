const transformInput = require('./transformInput')
const transformInputSearch = require('./transformInputSearch')
const transformInputUpdate = require('./transformInputUpdate')
const transformOutput = require('./transformOutput')
const transformOutputArray = require('./transformOutputArray')
const validateQueryInput = require('./validateQueryInput')
const validateUpdateBody = require('./validateUpdateBody')

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
          'document.catalogedUnit.catalogNumber': catalogNumber,
        })
        .then(result => {
          return transformOutputArray([result])
        })
    }

    if (identifiedTaxonNameStandardized) {
      return models.individualGroup.Model.findAll({
        where: {
          'document.identifications.0.identifiedTaxonNameStandardized': identifiedTaxonNameStandardized,
        },
      }).then(transformOutputArray)
    }

    throw new Error('Not implemented')
  }

  const update = ({ id, data }) => {
    validateUpdateBody({ data, id })
    return models.individualGroup
      .update({
        doc: transformInputUpdate(data),
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
