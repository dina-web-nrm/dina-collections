const createObjectResponse = require('../lib/api/utilities/createObjectResponse')
const transformInput = require('./transformations/inputObject')
const transformOutput = require('./transformations/outputObject')

module.exports = function create({
  connectorOptions = {},
  modelName,
  resource,
  models,
}) {
  const model = models[modelName]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  const { validateBody } = connectorOptions
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
