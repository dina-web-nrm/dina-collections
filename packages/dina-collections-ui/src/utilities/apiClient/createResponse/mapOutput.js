const chainPromises = require('../../chainPromises')
const extractMethodsFromConfigs = require('../utilities/extractMethodsFromConfigs')

module.exports = function mapOutput({
  apiConfig,
  endpointConfig,
  methodConfig,
  responseData,
}) {
  const configs = [apiConfig, endpointConfig, methodConfig]

  return Promise.all([
    chainPromises(
      extractMethodsFromConfigs(configs, 'mapResponse'),
      responseData || {}
    ),
  ]).then(([response]) => {
    return response
  })
}
