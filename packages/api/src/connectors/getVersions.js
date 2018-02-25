const createArrayResponse = require('../lib/api/utilities/createArrayResponse')
const transformOutput = require('./transformations/outputArray')

module.exports = function getVersionsById({ connectorOptions, models }) {
  const { resource } = connectorOptions
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return ({ request }) => {
    const { pathParams: { id } } = request
    return model
      .getWhere({ forceCurrentVersion: false, where: { id } })
      .then(res => transformOutput(res, true))
      .then(items => {
        return createArrayResponse({
          items,
          type: resource,
        })
      })
  }
}
