const createArrayResponse = require('./transformations/createArrayResponse')
const transformOutput = require('./transformations/outputArray')

module.exports = function getVersionsById({ operation, models }) {
  const { resource } = operation
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
