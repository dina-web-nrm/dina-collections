const createObjectResponse = require('../api/utilities/createObjectResponse')
const transformInput = require('./transformations/inputObject')
const transformOutput = require('./transformations/outputObject')

module.exports = function create({ modelName, resource: resourceInput }) {
  const resource = resourceInput || modelName
  return ({ models, request }) => {
    const { body: { data: input } } = request
    const model = models[modelName]
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
