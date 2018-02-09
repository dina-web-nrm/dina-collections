const createApiConfig = require('./factories/createApiConfig')
const createApiMethod = require('./createApiMethod')

module.exports = function createApiClient(options) {
  const apiConfig = createApiConfig(options)

  const formPost = createApiMethod(apiConfig, {
    mapHeaders: userInputHeaders => {
      return {
        ...userInputHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    },
    method: 'POST',
  })

  const httpDelete = createApiMethod(apiConfig, {
    method: 'delete',
  })

  const httpGet = createApiMethod(apiConfig, {
    method: 'GET',
  })

  const httpPatch = createApiMethod(apiConfig, {
    mapHeaders: userInputHeaders => {
      return {
        ...userInputHeaders,
        'Content-Type': 'application/json',
      }
    },
    method: 'PATCH',
  })

  const httpPost = createApiMethod(apiConfig, {
    mapHeaders: userInputHeaders => {
      return {
        ...userInputHeaders,
        'Content-Type': 'application/json',
      }
    },
    method: 'POST',
  })

  const httpPut = createApiMethod(apiConfig, {
    mapHeaders: userInputHeaders => {
      return {
        ...userInputHeaders,
        'Content-Type': 'application/json',
      }
    },
    method: 'PUT',
  })

  const methods = {
    formPost,
    httpDelete,
    httpGet,
    httpPatch,
    httpPost,
    httpPut,
  }

  const call = (endpointConfigInput, userInput = {}) => {
    const { methodName } = endpointConfigInput
    if (!methodName) {
      throw new new Error('methodName is required when using call')()
    }
    switch (methodName) {
      case 'formPost': {
        return formPost(endpointConfigInput, userInput)
      }
      case 'delete': {
        return httpDelete(endpointConfigInput, userInput)
      }
      case 'get': {
        return httpGet(endpointConfigInput, userInput)
      }
      case 'patch': {
        return httpPatch(endpointConfigInput, userInput)
      }
      case 'post': {
        return httpPost(endpointConfigInput, userInput)
      }
      case 'put': {
        return httpPut(endpointConfigInput, userInput)
      }
      default: {
        throw new Error(`${methodName} is not supperted in call`)
      }
    }
  }
  return {
    ...methods,
    call,
  }
}
