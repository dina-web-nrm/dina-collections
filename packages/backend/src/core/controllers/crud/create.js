const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformInput = require('../utilities/transformations/inputObject')
const transformOutput = require('../utilities/transformations/outputObject')

module.exports = function create({ operation = {}, models, postCreateHook }) {
  const { resource, validateBody, relations } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
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
      .then(transformOutput)
      .then(res => {
        if (postCreateHook) {
          return postCreateHook(res)
        }
        return res
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
