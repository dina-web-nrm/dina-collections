/* eslint-disable no-underscore-dangle */

module.exports = function getIndividualGroup({ controllers, request }) {
  const { queryParams = {} } = request

  const { catalogNumber, identifiedTaxonNameStandardized } =
    queryParams.filter || {}

  if (!catalogNumber && !identifiedTaxonNameStandardized) {
    const error = new Error('Provide input')
    error.status = 400
    throw error
  }

  const { Record } = controllers

  if (catalogNumber) {
    return Record.findOne({
      'catalogedUnit.catalogNumber': catalogNumber,
    }).then(existingRecord => {
      if (!existingRecord) {
        return {
          data: {
            data: [],
          },
        }
      }

      const jsonResult = existingRecord.toJSON()
      const id = jsonResult._id
      delete jsonResult._id
      delete jsonResult.catalogedUnit
      delete jsonResult.__v

      return {
        data: {
          data: [
            {
              attributes: {
                ...jsonResult,
              },
              id,
            },
          ],
        },
      }
    })
  }

  if (identifiedTaxonNameStandardized) {
    return Record.find({
      'identifications.0.identifiedTaxonNameStandardized': identifiedTaxonNameStandardized,
    }).then(existingRecords => {
      if (!existingRecords) {
        return {
          data: {
            data: [],
          },
        }
      }

      const array = existingRecords.map(existingRecord => {
        const jsonResult = existingRecord.toJSON()
        const id = jsonResult._id
        delete jsonResult._id
        delete jsonResult.catalogedUnit
        delete jsonResult.__v
        return {
          attributes: {
            ...jsonResult,
          },
          id,
        }
      })

      return {
        data: {
          data: array,
        },
      }
    })
  }

  throw new Error('Not implemented')
}
