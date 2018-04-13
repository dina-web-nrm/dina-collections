const extractErrorsFromEndpoints = require('./extractErrorsFromEndpoints')
const createModel = require('../../utilities/createModel')

const referencePath = '#/components/schemas/'

const extractResponsesFromEndpoints = ({ endpoints, normalize, version }) => {
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
            version,
          }),
        }
      }
    }

    return responses
  }, {})
}

const extractRequestsFromEndpoints = ({ endpoints, normalize, version }) => {
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
            version,
          }),
        }
      }
    }

    return responses
  }, {})
}

const extractModelsFromModels = ({ models, normalize, version }) => {
  return Object.keys(models).reduce((extractedModels, modelKey) => {
    const model = models[modelKey]
    const createdModel = createModel({
      model,
      normalize,
      referencePath,
      removeRelationships: true,
      version,
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
  version,
}) {
  const requests = extractRequestsFromEndpoints({
    endpoints,
    normalize,
    version,
  })
  const responses = extractResponsesFromEndpoints({
    endpoints,
    normalize,
    version,
  })
  const errors = extractErrorsFromEndpoints({ endpoints, normalize, version })
  const extractedModels = extractModelsFromModels({
    models,
    normalize,
    version,
  })

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
