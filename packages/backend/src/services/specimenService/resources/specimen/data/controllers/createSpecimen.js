const backendError500 = require('common/src/error/errorFactories/backendError500')
const createCatalogNumberIdentifier = require('../utilities/createCatalogNumberIdentifier')
const decorateRequestWithCatalogNumber = require('../utilities/decorateRequestWithCatalogNumber')
const deleteCatalogNumberIdentifier = require('../utilities/deleteCatalogNumberIdentifier')
const extractCatalogNumberFromSpecimen = require('../utilities/extractCatalogNumberFromSpecimen')
const fetchCatalogNumberIdentifierTypeId = require('../utilities/fetchCatalogNumberIdentifierTypeId')
const generateCatalogNumberIdentifier = require('../utilities/generateCatalogNumberIdentifier')

const createControllerFactory = require('../../../../../../lib/controllers/crud/create')

module.exports = function createSpecimen(options) {
  const { serviceInteractor } = options

  const createController = createControllerFactory(options)

  return ({ request, user, requestId }) => {
    return fetchCatalogNumberIdentifierTypeId({ serviceInteractor })
      .then(identifierTypeId => {
        const catalogNumber = extractCatalogNumberFromSpecimen({
          identifierTypeId,
          specimen: request.body.data,
        })

        if (catalogNumber) {
          return createCatalogNumberIdentifier({
            catalogNumber,
            serviceInteractor,
          }).then(catalogNumberIdentifier => {
            if (
              catalogNumberIdentifier.attributes.identifier !== catalogNumber
            ) {
              backendError500({
                code: 'INTERNAL_SERVER_ERROR',
                detail: 'Error saving catalogNumber',
              })
            }
            return {
              catalogNumberIdentifier,
              generated: false,
              identifierTypeId,
            }
          })
        }
        return generateCatalogNumberIdentifier({
          serviceInteractor,
        }).then(catalogNumberIdentifier => {
          return {
            catalogNumberIdentifier,
            generated: true,
            identifierTypeId,
          }
        })
      })
      .then(({ catalogNumberIdentifier, generated, identifierTypeId }) => {
        const updatedRequest = generated
          ? decorateRequestWithCatalogNumber({
              catalogNumber: catalogNumberIdentifier.attributes.identifier,
              identifierTypeId,
              request,
            })
          : request
        return createController({
          request: updatedRequest,
          requestId,
          user,
        }).catch(err => {
          return deleteCatalogNumberIdentifier({
            catalogNumberIdentifier,
            serviceInteractor,
          }).then(() => {
            throw err
          })
        })
      })
  }
}
