const backendError404 = require('common/src/error/errorFactories/backendError404')
const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformOutput = require('../utilities/transformations/outputObject')

module.exports = function getVersion({ operation, models }) {
  const { resource } = operation
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
      .then(({ item: res } = {}) => {
        if (!res) {
          backendError404({
            code: 'RESOURCE_NOT_FOUND_ERROR',
            detail: `${resource} with id: ${id} and versionId ${
              versionId
            } not found`,
          })
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
