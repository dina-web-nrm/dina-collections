const createObjectResponse = require('../../../../../lib/api/utilities/createObjectResponse')

module.exports = function getCuratedLocality({ controllers, request }) {
  return controllers.curatedLocality
    .getById({
      pathParams: request.pathParams,
    })
    .then(data => {
      return createObjectResponse({
        data,
        id: data.id,
        type: 'curatedLocality',
        versionId: data.versionId,
      })
    })
}
