const createObjectResponse = require('./transformations/createObjectResponse')
const transformInput = require('./transformations/inputObject')
const transformOutput = require('./transformations/outputObject')

module.exports = function create({ operation = {}, models }) {
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
        })
      )
      .then(transformOutput)
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
