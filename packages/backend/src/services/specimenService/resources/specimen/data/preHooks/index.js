const backendError400 = require('common/src/error/errorFactories/backendError400')
const extractCatalogNumberFromSpecimen = require('../utilities/extractCatalogNumberFromSpecimen')
const fetchCatalogNumberIdentifierTypeId = require('../utilities/fetchCatalogNumberIdentifierTypeId')
const fetchStoredCatalogNumber = require('../utilities/fetchStoredCatalogNumber')

const validateBodyUpdate = ({ request, serviceInteractor }) => {
  return fetchCatalogNumberIdentifierTypeId({ serviceInteractor }).then(
    typeId => {
      return extractCatalogNumberFromSpecimen({
        specimen: request.body.data.attributes,
        typeId,
      }).then(catalogNumber => {
        return fetchStoredCatalogNumber({
          serviceInteractor,
          specimenId: request.pathParams.id,
        }).then(storedCatalogNumber => {
          if (catalogNumber !== storedCatalogNumber) {
            backendError400({
              code: 'REQUEST_ERROR',
              detail: 'Not allowed to update catalogNumber',
            })
          }
        })
      })
    }
  )
}

// exports.create = [validateBodyCreate]
exports.update = [validateBodyUpdate]
