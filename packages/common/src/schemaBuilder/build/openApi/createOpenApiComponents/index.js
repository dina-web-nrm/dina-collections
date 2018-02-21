const interpolate = require('../../utilities/interpolate')

const createModel = (model, examples) => {
  const cleanedModel = model
  if (model.modelType) {
    cleanedModel['x-modelType'] = model.modelType
    delete cleanedModel.modelType
  }
  if (examples) {
    cleanedModel['x-examples'] = examples

    if (examples.primary) {
      cleanedModel.example = examples.primary
    }
  }

  return interpolate(cleanedModel, '__ROOT__', '#/components/schemas/')
}

const createResponseObject = (schema, examples) => {
  return createModel(schema.content, examples)
}

const createRequestObject = (schema, examples) => {
  return createModel(schema.body, examples)
}

const extractResponsesFromEndpoints = endpoints => {
  return Object.keys(endpoints).reduce((responses, endpointName) => {
    const { response } = endpoints[endpointName]
    if (response) {
      const { name, schema, examples } = response
      if (name && schema) {
        return {
          ...responses,
          [name]: createResponseObject(schema, examples),
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
      const { name, schema, examples } = request
      if (name && schema) {
        return {
          ...responses,
          [name]: createRequestObject(schema, examples),
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

module.exports = function createOpenApiComponents({
  endpoints,
  models,
  security,
}) {
  const requests = extractRequestsFromEndpoints(endpoints)
  const responses = extractResponsesFromEndpoints(endpoints)
  const extractedModels = extractModelsFromModels(models)

  return {
    schemas: {
      ...extractedModels,
      ...requests,
      ...responses,
    },
    securitySchemes: {
      ...security,
    },
  }
}
