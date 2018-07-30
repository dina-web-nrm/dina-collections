const createObjectResponse = require('../utilities/transformations/createObjectResponse')

module.exports = function del({ operation, models, serviceInteractor }) {
  const { resource, postDeleteHook } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.deactivate) {
    throw new Error(`Model missing required method: deactivate for ${resource}`)
  }
  return ({ request }) => {
    const { pathParams: { id } } = request

    return model
      .deactivate({ id })
      .then(({ item } = {}) => {
        if (postDeleteHook) {
          return postDeleteHook({ item, serviceInteractor }).then(() => {
            return item
          })
        }

        return item
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
