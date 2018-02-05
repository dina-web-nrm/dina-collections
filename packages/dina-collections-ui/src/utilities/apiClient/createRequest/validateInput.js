const extractMethodsFromConfigs = require('../utilities/extractMethodsFromConfigs')
const chainPromises = require('../../chainPromises')

module.exports = function validate({
  apiConfig,
  endpointConfig,
  methodConfig,
  request,
}) {
  const { validateInput } = apiConfig

  if (!validateInput) {
    return Promise.resolve(request)
  }
  const configs = [apiConfig, endpointConfig, methodConfig]
  return Promise.all([
    chainPromises(
      extractMethodsFromConfigs(configs, 'validateBody'),
      request.body
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'validateHeaders'),
      request.headers
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'validatePathParams'),
      request.pathParams
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'validateQueryParams'),
      request.queryParams
    ),
  ]).then(() => {
    return request
  })
}
