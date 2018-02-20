const createArrayResponse = require('../lib/api/utilities/createArrayResponse')
const transformOutput = require('./transformations/outputArray')

module.exports = function getVersionsById({ modelName, resource }) {
  return ({ models, request }) => {
    const { pathParams: { id } } = request

    const model = models[modelName]
    return model
      .getWhere({ forceCurrentVersion: false, where: { id } })
      .then(transformOutput)
      .then(items => {
        return createArrayResponse({
          items,
          type: resource,
        })
      })
  }
}
