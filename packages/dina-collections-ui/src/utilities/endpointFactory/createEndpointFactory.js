const openApiSpec = require('dina-schema/build/openApi.json')
const { createSystemModelSchemaValidator } = require('../error')
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
    requestBody.content['application/json'] &&
    requestBody.content['application/json'].schema
  )
}

const getSchemaFromResponse = response => {
  return (
    response &&
    response.content &&
    response.content['application/json'] &&
    response.content['application/json'].schema
  )
}

const getBodyValidator = ({ methodSpecification }) => {
  const schema = getSchemaFromRequestBody(methodSpecification.requestBody)

  if (schema) {
    const modelName = getModelNameFromSchema(schema)
    return createSystemModelSchemaValidator({
      model: modelName,
      throwOnError: true,
    })
  }

  return null
}

const getResponseValidator = ({ methodSpecification }) => {
  const schema = getSchemaFromResponse(methodSpecification.responses[200])
  if (schema) {
    const modelName = getModelNameFromSchema(schema)
    if (modelName) {
      return createSystemModelSchemaValidator({
        dataPath: 'json',
        model: modelName,
        throwOnError: true,
      })
    }
    return createSystemModelSchemaValidator({
      dataPath: 'json',
      schema,
      throwOnError: true,
    })
  }

  return null
}

const createMockData = ({ importFaker, methodSpecification }) => {
  const schema = getSchemaFromResponse(methodSpecification.responses[200])
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

module.exports = function createEndpointFactory({ importFaker }) {
  return function createEndpoint({ operationId, ...rest }) {
    if (!map[operationId]) {
      console.warn(`Operation id: ${operationId} unknown`) // eslint-disable-line no-console
    }

    const { methodName, methodSpecification, pathname } = map[operationId] || {}
    return {
      methodName,
      mock: createMockData({
        importFaker,
        methodSpecification,
      }),
      operationId,
      pathname,
      validateBody: getBodyValidator({
        methodSpecification,
      }),
      validateResponse: getResponseValidator({
        methodSpecification,
      }),
      ...rest,
    }
  }
}
