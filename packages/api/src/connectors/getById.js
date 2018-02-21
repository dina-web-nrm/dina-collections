const createObjectResponse = require('../lib/api/utilities/createObjectResponse')
const transformOutput = require('./transformations/outputObject')

module.exports = function getById({ modelName, resource, models }) {
  const model = models[modelName]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return ({ request }) => {
    const { pathParams: { id } } = request
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
