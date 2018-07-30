const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformInput = require('../utilities/transformations/inputObject')

module.exports = function create({
  operation = {},
  models,
  serviceInteractor,
}) {
  const { resource, validateBody, relations, postCreateHook } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.create) {
    throw new Error(`Model missing required method: create for ${resource}`)
  }

  return ({ request }) => {
    const { body } = request
    if (validateBody) {
      validateBody(body)
    }
    const { data: input } = body
    return model
      .create(
        transformInput({
          input,
          relations,
          sourceResource: resource,
        })
      )
      .then(({ item } = {}) => {
        if (postCreateHook) {
          return postCreateHook({ item, serviceInteractor }).then(() => {
            return item
          })
        }
        return item
      })
      .then(output => {
        return createObjectResponse({
          data: output,
          id: output.id,
          status: 201,
          type: resource,
        })
      })
  }
}
