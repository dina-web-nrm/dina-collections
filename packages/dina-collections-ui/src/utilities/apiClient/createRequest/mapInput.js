const extractMethodsFromConfigs = require('../utilities/extractMethodsFromConfigs')
const chainPromises = require('../../chainPromises')

module.exports = function mapInput({
  apiConfig,
  endpointConfig,
  methodConfig,
  userInput,
}) {
  const configs = [apiConfig, endpointConfig, methodConfig]

  return Promise.all([
    chainPromises(
      extractMethodsFromConfigs(configs, 'mapBody'),
      userInput.body || {}
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'mapHeaders'),
      userInput.headers || {}
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'mapPathParams'),
      userInput.pathParams || {}
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'mapQueryParams'),
      userInput.queryParams || {}
    ),
  ]).then(([body, headers, pathParams, queryParams]) => {
    return {
      body,
      headers,
      pathParams,
      queryParams,
    }
  })
}
