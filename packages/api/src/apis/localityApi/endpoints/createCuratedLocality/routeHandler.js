const createObjectResponse = require('../../../../lib/api/utilities/createObjectResponse')

module.exports = function createCuratedLocality({ controllers, request }) {
  return controllers.localityApi.create({ body: request.body }).then(data => {
    return createObjectResponse({
      data,
      id: data.id,
      type: 'curatedLocality',
      versionId: data.versionId,
    })
  })
}
