const createObjectResponse = require('../lib/api/utilities/createObjectResponse')
const transformInput = require('./transformations/inputObject')
const transformOutput = require('./transformations/outputObject')

module.exports = function create({ modelName, resource: resourceInput }) {
  const resource = resourceInput || modelName
  return ({ models, request }) => {
    const { body: { data: input } } = request
    const { pathParams: { id } } = request

    const model = models[modelName]
    return model
      .update({
        doc: transformInput(input),
        id,
      })
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
