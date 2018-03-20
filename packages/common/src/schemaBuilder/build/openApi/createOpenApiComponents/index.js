const extractErrorsFromEndpoints = require('./extractErrorsFromEndpoints')
const createModel = require('../../utilities/createModel')

const referencePath = '#/components/schemas/'

const extractResponsesFromEndpoints = ({ endpoints, normalize }) => {
  return Object.keys(endpoints).reduce((responses, endpointName) => {
    const { response } = endpoints[endpointName]
    if (response) {
      const { name, schema, examples } = response
      if (name && schema) {
        return {
          ...responses,
          [name]: createModel({
            examples,
            model: schema.content,
            normalize,
            referencePath,
          }),
        }
      }
    }

    return responses
  }, {})
}

const extractRequestsFromEndpoints = ({ endpoints, normalize }) => {
  return Object.keys(endpoints).reduce((responses, endpointName) => {
    const { request } = endpoints[endpointName]
    if (request) {
      const { name, schema, examples } = request
      if (name && schema) {
        return {
          ...responses,
          [name]: createModel({
            examples,
            model: schema.body,
            normalize,
            referencePath,
          }),
        }
      }
    }

    return responses
  }, {})
}

const extractModelsFromModels = ({ models, normalize }) => {
  return Object.keys(models).reduce((extractedModels, modelKey) => {
    const model = models[modelKey]
    const createdModel = createModel({
      model,
      normalize,
      referencePath,
      removeRelationships: true,
    })
    return {
      ...extractedModels,
      [modelKey]: createdModel,
    }
  }, {})
}

module.exports = function createOpenApiComponents({
  endpoints,
  models,
  normalize,
  security,
}) {
  const requests = extractRequestsFromEndpoints({ endpoints, normalize })
  const responses = extractResponsesFromEndpoints({ endpoints, normalize })
  const errors = extractErrorsFromEndpoints({ endpoints, normalize })
  const extractedModels = extractModelsFromModels({ models, normalize })

  return {
    schemas: {
      ...extractedModels,
      ...errors,
      ...requests,
      ...responses,
    },
    securitySchemes: {
      ...security,
    },
  }
}
