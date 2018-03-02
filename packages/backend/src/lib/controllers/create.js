const createObjectResponse = require('./transformations/createObjectResponse')
const transformInput = require('./transformations/inputObject')
const transformOutput = require('./transformations/outputObject')

module.exports = function create({ operation = {}, models }) {
  const { resource, validateBody } = operation

  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return ({ request }) => {
    const { body } = request
    const { data: input } = body
    if (validateBody) {
      validateBody(body)
    }

    return model
      .create(transformInput(input))
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
