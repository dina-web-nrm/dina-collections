const getCurrentYear = require('common/src/date/getCurrentYear')
const generateCatalogNumber = require('../../utilities/generateCatalogNumber')
const createControllerWrapper = require('../../../../../../lib/controllers/utilities/wrapper')

module.exports = function generateCatalogNumberController(options) {
  return createControllerWrapper({
    ...options,
    enableInterceptors: true,
    enablePostHooks: true,
    enablePreHooks: true,
    requiredModelMethods: ['create'],
    responseFormat: 'object',
    responseSuccessStatus: 201,
  })(({ log, model, serviceInteractor }) => {
    const recursiveCreate = ({ prevNumber, retryCount = 0, year }) => {
      const { newNumber, identifier } = generateCatalogNumber({
        prevNumber,
        year,
      })

      return model
        .create({
          item: {
            attributes: {
              identifier,
              number: newNumber,
              year,
            },
          },
        })
        .catch(err => {
          if (retryCount > 4) {
            log.err(`Failed 5 times generating new catalogNumber`)
            throw err
          }
          return recursiveCreate({
            prevNumber: newNumber,
            retryCount: retryCount + 1,
            year,
          })
        })
    }

    const year = getCurrentYear()
    return serviceInteractor
      .getMany({
        request: {
          queryParams: {
            filter: {
              year,
            },
            limit: 1,
            sort: ['number:desc'],
          },
        },
        resource: 'catalogNumber',
      })
      .then(({ data: items }) => {
        const lastIdentifier = items.length ? items[0] : {}
        const { number: prevNumber } = lastIdentifier.attributes || {}
        return recursiveCreate({
          prevNumber,
          year,
        }).then(({ item }) => {
          return { item }
        })
      })
  })
}
