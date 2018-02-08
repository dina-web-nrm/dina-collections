const createObjectResponse = require('../../../../../lib/api/utilities/createObjectResponse')

module.exports = function updateCuratedLocality({ controllers, request }) {
  return controllers.curatedLocality
    .update({
      body: request.body,
      pathParams: request.pathParams,
    })
    .then(data => {
      return createObjectResponse({
        data,
        id: data.id,
        type: 'individualGroup',
        versionId: data.versionId,
      })
    })
}
