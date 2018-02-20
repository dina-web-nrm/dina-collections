const createObjectResponse = require('../lib/api/utilities/createObjectResponse')
const transformOutput = require('./transformations/outputObject')

module.exports = function getVersion({ modelName, resource }) {
  return ({ models, request }) => {
    const { pathParams: { id, versionId } } = request

    const model = models[modelName]
    return model
      .getById({
        forceCurrentVersion: false,
        id,
        versionId,
      })
      .then(res => {
        if (!res) {
          const error = new Error(
            `${modelName} with id: ${id} and versionId ${versionId} not found`
          )
          error.status = 404
          throw error
        }
        return res
      })
      .then(transformOutput)
      .then(output => {
        return createObjectResponse({
          data: output,
          id: output.id,
          type: resource,
        })
      })
  }
}
