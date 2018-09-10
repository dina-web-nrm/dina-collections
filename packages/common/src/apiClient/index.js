const { Dependor } = require('../Dependor')
const createApiMethod = require('./createApiMethod')
const validateApiConfig = require('./validation/validateApiConfig')
const createDownloadFile = require('./createDownloadFile')

const dep = new Dependor(
  {
    createApiMethod,
    validateApiConfig,
  },
  'apiClient:index'
)

function createApiClient(apiConfigInput) {
  const apiConfig = {
    validateInput: true,
    validateOutput: true,
    ...apiConfigInput,
  }

  dep.validateApiConfig(apiConfig)

  const downloadFile = createDownloadFile(apiConfig)

  const formPost = dep.createApiMethod(apiConfig, {
    mapHeaders: userInputHeaders => {
      return {
        ...userInputHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    },
    method: 'POST',
  })

  const httpDelete = dep.createApiMethod(apiConfig, {
    mapHeaders: userInputHeaders => {
      return {
        ...userInputHeaders,
        Accept: 'application/vnd.api+json',
      }
    },
    method: 'delete',
  })

  const httpGet = dep.createApiMethod(apiConfig, {
    mapHeaders: userInputHeaders => {
      return {
        ...userInputHeaders,
        Accept: 'application/vnd.api+json',
      }
    },
    method: 'GET',
  })

  const httpPatch = dep.createApiMethod(apiConfig, {
    mapHeaders: userInputHeaders => {
      return {
        ...userInputHeaders,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      }
    },
    method: 'PATCH',
  })

  const httpPost = dep.createApiMethod(apiConfig, {
    mapHeaders: userInputHeaders => {
      return {
        ...userInputHeaders,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      }
    },
    method: 'POST',
  })

  const httpPut = dep.createApiMethod(apiConfig, {
    mapHeaders: userInputHeaders => {
      return {
        ...userInputHeaders,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      }
    },
    method: 'PUT',
  })

  const methods = {
    downloadFile,
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
      throw new Error('methodName is required when using call')
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
        throw new Error(`${methodName} is not supported in call`)
      }
    }
  }
  return {
    ...methods,
    call,
  }
}

module.exports = {
  createApiClient,
  dep,
}
