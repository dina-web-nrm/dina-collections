const createObjectResponse = require('../api/utilities/createObjectResponse')
const transformOutput = require('./transformations/outputObject')

module.exports = function getById({
  modelName,
  resource: resourceInput,
  includes,
}) {
  const resource = resourceInput || modelName
  return ({ models, request }) => {
    const { pathParams: { id } } = request
    const { queryParams: { include: includesInput = '' } } = request

    const include = includesInput
      .split(',')
      .map(includeString => {
        if (!includes[includeString]) {
          return null
        }
        const { model: includeModelName, as } = includes[includeString]
        return {
          as,
          model: models[includeModelName].Model,
        }
      })
      .filter(includeSpecification => {
        return !!includeSpecification
      })

    const model = models[modelName]
    return model
      .getById({ id, include })
      .then(res => {
        if (!res) {
          const error = new Error(`${modelName} with id: ${id} not found`)
          error.status = 404
          throw error
        }
        return res
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
