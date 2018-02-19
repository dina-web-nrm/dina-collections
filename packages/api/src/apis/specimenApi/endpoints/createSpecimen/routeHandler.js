const createObjectResponse = require('../../../../lib/api/utilities/createObjectResponse')

module.exports = function createSpecimen({ controllers, request }) {
  return controllers.specimensApi
    .create({ data: request.body.data })
    .then(result => {
      return createObjectResponse({
        data: result,
        id: result.id,
        type: 'specimen',
      })
    })
}
