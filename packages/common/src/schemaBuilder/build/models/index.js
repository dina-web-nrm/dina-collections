/* eslint-disable sort-keys */
const createModel = require('../utilities/createModel')

const referencePath = ''

const extractResponseModelsFromEndpoints = (endpoints, normalize) => {
  return Object.keys(endpoints).reduce((responses, endpointName) => {
    const { response } = endpoints[endpointName]
    if (response) {
      const { examples, name, schema } = response
      if (name && schema) {
        return {
          ...responses,
          [name]: createModel({
            examples,
            model: schema.content,
            name,
            normalize,
            referencePath,
          }),
        }
      }
    }

    return responses
  }, {})
}

const extractRequestModelsFromEndpoints = (endpoints, normalize) => {
  return Object.keys(endpoints).reduce((responses, endpointName) => {
    const { request } = endpoints[endpointName]
    if (request) {
      const { examples, name, schema } = request
      if (name && schema) {
        return {
          ...responses,
          [name]: createModel({
            examples,
            model: schema.body,
            name,
            normalize,
            referencePath,
          }),
        }
      }
    }

    return responses
  }, {})
}

const extractModelsFromModels = (models, normalize) => {
  return Object.keys(models).reduce((extractedModels, modelKey) => {
    const model = models[modelKey]
    return {
      ...extractedModels,
      [modelKey]: createModel({ model, modelKey, normalize, referencePath }),
    }
  }, {})
}

module.exports = function createModels({ endpoints, models, normalize }) {
  const requestModels = extractRequestModelsFromEndpoints(endpoints, normalize)
  const responseModels = extractResponseModelsFromEndpoints(
    endpoints,
    normalize
  )
  const extractedModels = extractModelsFromModels(models, normalize)

  return {
    ...extractedModels,
    ...responseModels,
    ...requestModels,
  }
}
