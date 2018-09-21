const getCurrentYear = require('common/src/date/getCurrentYear')
const generateCatalogNumber = require('../../utilities/generateCatalogNumber')

const createObjectResponse = require('../../../../../../../lib/controllers/utilities/transformations/createObjectResponse')

module.exports = function generateCatalogNumberController({
  models,
  operation = {},
  serviceInteractor,
}) {
  const { resource } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.create) {
    throw new Error(`Model missing required method: create for ${resource}`)
  }

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
          console.log(`Failed 5 times generating new catalogNumber`)
          throw err
        }
        return recursiveCreate({
          prevNumber: newNumber,
          retryCount: retryCount + 1,
          year,
        })
      })
  }

  return () => {
    // 1.validate request

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
          return createObjectResponse({
            data: item,
            id: item.id,
            status: 201,
            type: resource,
          })
        })
      })
  }
}
