/* eslint-disable sort-keys */
const interpolate = require('../utilities/interpolate')

const createModel = ({ model, modelKey }) => {
  return interpolate(
    {
      ...model,
      description: model.description || '',
      id: modelKey,
    },
    '__ROOT__',
    ''
  )
}

const createResponseModel = ({ schema, name }) => {
  return createModel({
    model: schema.content,
    name,
  })
}

const createRequestModel = ({ schema, name }) => {
  return createModel({
    model: schema.body,
    name,
  })
}

const extractResponseModelsFromEndpoints = endpoints => {
  return Object.keys(endpoints).reduce((responses, endpointName) => {
    const { response } = endpoints[endpointName]
    if (response) {
      const { name, schema } = response
      if (name && schema) {
        return {
          ...responses,
          [name]: createResponseModel({ schema, name }),
        }
      }
    }

    return responses
  }, {})
}

const extractRequestModelsFromEndpoints = endpoints => {
  return Object.keys(endpoints).reduce((responses, endpointName) => {
    const { request } = endpoints[endpointName]
    if (request) {
      const { name, schema } = request
      if (name && schema) {
        return {
          ...responses,
          [name]: createRequestModel({ schema, name }),
        }
      }
    }

    return responses
  }, {})
}

const extractModelsFromModels = models => {
  return Object.keys(models).reduce((extractedModels, modelKey) => {
    const model = models[modelKey]
    return {
      ...extractedModels,
      [modelKey]: createModel({ model, modelKey }),
    }
  }, {})
}

module.exports = function createModels({ endpoints, models }) {
  const requestModels = extractRequestModelsFromEndpoints(endpoints)
  const responseModels = extractResponseModelsFromEndpoints(endpoints)
  const extractedModels = extractModelsFromModels(models)

  return {
    ...extractedModels,
    ...responseModels,
    ...requestModels,
  }
}
