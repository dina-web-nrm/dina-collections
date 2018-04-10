const createObjectResponse = require('./transformations/createObjectResponse')
const transformInput = require('./transformations/inputObject')
const transformOutput = require('./transformations/outputObject')

module.exports = function update({ operation, models, postUpdateHook }) {
  const { resource, relations } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return ({ request }) => {
    const { body: { data: input } } = request
    const { pathParams: { id } } = request

    return model
      .update({
        doc: transformInput({ input, relations }),
        id,
      })
      .then(transformOutput)
      .then(res => {
        if (postUpdateHook) {
          return postUpdateHook(res)
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
