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
      .then(res => {
        if (!(res && res.length)) {
          const error = new Error(`${resource} with id: ${id} not found`)
          error.status = 404
          throw error
        }
        return res
      })
      .then(res => transformOutput(res, true))
      .then(items => {
        return createArrayResponse({
          items,
          type: resource,
        })
      })
  }
}
