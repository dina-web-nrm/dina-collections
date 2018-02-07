const createObjectResponse = require('../../../../../lib/api/utilities/createObjectResponse')

module.exports = function createIndividualGroup({ controllers, request }) {
  return controllers.individualGroup
    .create({ data: request.body.data })
    .then(result => {
      return createObjectResponse({
        data: result,
        id: result.id,
        type: 'individualGroup',
      })
    })
}
