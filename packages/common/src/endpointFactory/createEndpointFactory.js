const openApiSpec = require('../../dist/openApi.json')
const createBackendApiClientValidator = require('../error/validators/createBackendApiClientValidator')
const createFrontendApiClientValidator = require('../error/validators/createFrontendApiClientValidator')
const createMockGenerator = require('../jsonSchema/createMockGenerator')

const buildOperationIdPathnameMap = () => {
  const map = {}
  Object.keys(openApiSpec.paths).forEach(pathname => {
    const methods = openApiSpec.paths[pathname]
    Object.keys(methods).forEach(methodName => {
      const methodSpecification = methods[methodName]
      if (methodSpecification.operationId)
        map[methodSpecification.operationId] = {
          methodName,
          methodSpecification,
          pathname,
        }
    })
  })

  return map
}

const map = buildOperationIdPathnameMap()

const getModelNameFromSchema = schema => {
  if (!schema) {
    return null
  }

  if (!schema.$ref) {
    return null
  }

  const segments = schema.$ref.split('/')

  return segments[segments.length - 1]
}

const getSchemaFromRequestBody = requestBody => {
  return (
    requestBody &&
    requestBody.content &&
    requestBody.content['application/vnd.api+json'] &&
    requestBody.content['application/vnd.api+json'].schema
  )
}

const getSchemaFromResponse = response => {
  return (
    response &&
    response.content &&
    response.content['application/vnd.api+json'] &&
    response.content['application/vnd.api+json'].schema
  )
}

const getBodyValidator = ({ methodSpecification, origin }) => {
  const schema = getSchemaFromRequestBody(methodSpecification.requestBody)

  if (schema) {
    const modelName = getModelNameFromSchema(schema)
    if (origin === 'server') {
      return createBackendApiClientValidator({
        model: modelName,
        type: 'request-body',
      })
    }
    return createFrontendApiClientValidator({
      model: modelName,
      type: 'request-body',
    })
  }

  return null
}

const getResponseValidator = ({ methodSpecification, origin }) => {
  const schema = getSchemaFromResponse(
    methodSpecification.responses[200] || methodSpecification.responses[201]
  )
  if (schema) {
    const modelName = getModelNameFromSchema(schema)
    if (origin === 'server') {
      return createBackendApiClientValidator({
        model: modelName,
        schema,
        type: 'response',
      })
    }
    return createFrontendApiClientValidator({
      model: modelName,
      schema,
      type: 'response',
    })
  }

  return null
}

const getExamplesFromMethodSpecifiction = methodSpecification => {
  const schema = getSchemaFromResponse(
    methodSpecification.responses[200] || methodSpecification.responses[201]
  )
  if (!schema) {
    return null
  }

  const modelName = getModelNameFromSchema(schema)
  if (!modelName) {
    return null
  }

  return (
    openApiSpec &&
    openApiSpec.components &&
    openApiSpec.components.schemas &&
    openApiSpec.components.schemas[modelName] &&
    openApiSpec.components.schemas[modelName]['x-examples']
  )
}

const createMockData = ({ importFaker, methodSpecification }) => {
  const schema = getSchemaFromResponse(
    methodSpecification.responses[200] || methodSpecification.responses[201]
  )
  if (schema) {
    const modelName = getModelNameFromSchema(schema)
    if (modelName) {
      return createMockGenerator({
        importFaker,
        model: modelName,
      })
    }
    return createMockGenerator({
      importFaker,
      schema,
    })
  }

  return null
}

const createGetExample = ({ methodSpecification }) => {
  const examples = getExamplesFromMethodSpecifiction(methodSpecification)
  return exampleId => {
    if (!examples) {
      return Promise.resolve(null)
    }

    return Promise.resolve(examples[exampleId])
  }
}

module.exports = function createEndpointFactory({
  origin = 'client',
  importFaker,
}) {
  return function createEndpoint({ operationId, ...rest }) {
    if (!map[operationId]) {
      throw new Error(`Operation id: ${operationId} unknown`) // eslint-disable-line no-console
    }

    const { methodName, methodSpecification, pathname } = map[operationId] || {}
    return {
      getExample: createGetExample({
        methodSpecification,
      }),
      methodName,
      mock: createMockData({
        importFaker,
        methodSpecification,
      }),

      operationId,
      pathname,
      validateBody: getBodyValidator({
        methodSpecification,
        origin,
      }),
      validateResponse: getResponseValidator({
        methodSpecification,
        origin,
      }),
      ...rest,
    }
  }
}
