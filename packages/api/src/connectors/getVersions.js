const createArrayResponse = require('../lib/api/utilities/createArrayResponse')
const transformOutput = require('./transformations/outputArray')

module.exports = function getVersionsById({ modelName, resource, models }) {
  const model = models[modelName]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return ({ request }) => {
    const { pathParams: { id } } = request
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
