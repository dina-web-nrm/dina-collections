const createObjectResponse = require('../../../../../lib/api/utilities/createObjectResponse')

module.exports = function getCuratedLocalityByVersion({
  controllers,
  request,
}) {
  return controllers.curatedLocality
    .getByIdAndVersionId({
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
