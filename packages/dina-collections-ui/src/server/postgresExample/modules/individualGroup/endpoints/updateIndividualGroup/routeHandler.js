const createObjectResponse = require('../../../../../lib/api/utilities/createObjectResponse')

module.exports = function updateIndividualGroup({ controllers, request }) {
  return controllers.individualGroup
    .update({
      data: request.body.data,
      id: request.pathParams.id,
    })
    .then(result => {
      return createObjectResponse({
        data: result,
        id: result.id,
        type: 'individualGroup',
      })
    })
}
