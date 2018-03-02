const createObjectResponse = require('./transformations/createObjectResponse')
const transformOutput = require('./transformations/outputObject')

module.exports = function getVersion({ connectorOptions, models }) {
  const { resource } = connectorOptions
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return ({ request }) => {
    const { pathParams: { id, versionId } } = request

    return model
      .getById({
        forceCurrentVersion: false,
        id,
        versionId,
      })
      .then(res => {
        if (!res) {
          const error = new Error(
            `${resource} with id: ${id} and versionId ${versionId} not found`
          )
          error.status = 404
          throw error
        }
        return res
      })
      .then(res => transformOutput(res, true))
      .then(output => {
        return createObjectResponse({
          data: output,
          id: output.id,
          type: resource,
        })
      })
  }
}
