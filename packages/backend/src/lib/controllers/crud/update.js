const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformInput = require('../utilities/transformations/inputObject')

module.exports = function update({ operation, models, serviceInteractor }) {
  const { resource, relations, postUpdateHook } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  if (!model.update) {
    throw new Error(`Model missing required method: update for ${resource}`)
  }

  return ({ request }) => {
    const { body: { data: input = {} } = {} } = request
    const { pathParams: { id } } = request

    return model
      .update({
        id,
        ...transformInput({ input, relations, sourceResource: resource }),
      })
      .then(({ item } = {}) => {
        if (postUpdateHook) {
          return postUpdateHook({ item, serviceInteractor }).then(() => {
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
