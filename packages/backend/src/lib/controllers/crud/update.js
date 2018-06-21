const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformInput = require('../utilities/transformations/inputObject')
const transformOutput = require('../utilities/transformations/outputObject')

module.exports = function update({ operation, models, serviceInteractor }) {
  const { resource, relations, postUpdateHook } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
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
        const res = transformOutput(item)
        if (postUpdateHook) {
          return postUpdateHook({ res, serviceInteractor }).then(() => {
            return res
          })
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
