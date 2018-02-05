const interpolate = require('../../utilities/interpolate')

const createModel = model => {
  const cleanedModel = model
  if (model.modelType) {
    cleanedModel['x-modelType'] = model.modelType
    delete cleanedModel.modelType
  }
  return interpolate(cleanedModel, '__ROOT__', '#/components/schemas/')
}

const createResponseObject = schema => {
  return createModel(schema.content)
}

const createRequestObject = schema => {
  return createModel(schema.body)
}

const extractResponsesFromEndpoints = endpoints => {
  return Object.keys(endpoints).reduce((responses, endpointName) => {
    const { response } = endpoints[endpointName]
    if (response) {
      const { name, schema } = response
      if (name && schema) {
        return {
          ...responses,
          [name]: createResponseObject(schema),
        }
      }
    }

    return responses
  }, {})
}

const extractRequestsFromEndpoints = endpoints => {
  return Object.keys(endpoints).reduce((responses, endpointName) => {
    const { request } = endpoints[endpointName]
    if (request) {
      const { name, schema } = request
      if (name && schema) {
        return {
          ...responses,
          [name]: createRequestObject(schema),
        }
      }
    }

    return responses
  }, {})
}

const extractModelsFromModels = models => {
  return Object.keys(models).reduce((extractedModels, modelKey) => {
    const model = models[modelKey]
    const createdModel = createModel(model)
    return {
      ...extractedModels,
      [modelKey]: createdModel,
    }
  }, {})
}

module.exports = function createOpenApiComponents({ endpoints, models }) {
  const requests = extractRequestsFromEndpoints(endpoints)
  const responses = extractResponsesFromEndpoints(endpoints)
  const extractedModels = extractModelsFromModels(models)

  return {
    schemas: {
      ...extractedModels,
      ...requests,
      ...responses,
    },
  }
}
