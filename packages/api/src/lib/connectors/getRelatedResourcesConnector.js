const createObjectResponse = require('../api/utilities/createObjectResponse')
const transformOutput = require('./transformations/outputObject')

module.exports = function getById({ modelName, resource: resourceInput }) {
  const resource = resourceInput || modelName
  return ({ models, request }) => {
    const { pathParams: { id } } = request

    const model = models[modelName]
    return model
      .getById({ id })
      .then(res => {
        if (!res) {
          const error = new Error(`${modelName} with id: ${id} not found`)
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
