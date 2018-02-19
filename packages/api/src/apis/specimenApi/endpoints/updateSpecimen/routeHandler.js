const createObjectResponse = require('../../../../lib/api/utilities/createObjectResponse')

module.exports = function updateSpecimen({ controllers, request }) {
  return controllers.specimensApi
    .update({
      data: request.body.data,
      id: request.pathParams.id,
    })
    .then(result => {
      return createObjectResponse({
        data: result,
        id: result.id,
        type: 'specimen',
      })
    })
}
