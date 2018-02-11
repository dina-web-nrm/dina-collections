const chainPromises = require('../../chainPromises')
const extractMethodsFromConfigs = require('../utilities/extractMethodsFromConfigs')

module.exports = function validate({
  apiConfig,
  endpointConfig,
  methodConfig,
  responseData,
}) {
  const { validateOutput } = apiConfig

  const configs = [apiConfig, endpointConfig, methodConfig]

  return !validateOutput
    ? Promise.resolve()
    : Promise.all([
        chainPromises(
          extractMethodsFromConfigs(configs, 'validateResponse'),
          responseData
        ),
      ])
}
