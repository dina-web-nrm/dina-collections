const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformOutput = require('../utilities/transformations/outputObject')

module.exports = function del({ operation, models, postDeleteHook }) {
  const { resource } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return ({ request }) => {
    const { pathParams: { id } } = request

    return model
      .deactivate({ id })
      .then(transformOutput)
      .then(res => {
        if (postDeleteHook) {
          return postDeleteHook(res)
        }
        return res
      })
      .then(output => {
        return createObjectResponse({
          data: output,
          id: output.id,
          type: resource,
        })
      })
  }
}
