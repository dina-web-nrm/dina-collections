const createLog = require('../../utilities/log')
const integrationFactories = require('./factories')

const log = createLog('integrations')

module.exports = function setupIntegrations({ config } = {}) {
  log.info('Setup integrations')

  if (!config.integrations) {
    log.scope().warning('No integrations configured')
    return null
  }

  return Promise.resolve(
    Object.keys(config.integrations).reduce((integrations, integrationName) => {
      const integrationConfig = config.integrations[integrationName]

      if (integrationConfig.active && integrationFactories[integrationName]) {
        log.scope().info(`Initializing ${integrationName}`)
        return integrationFactories[integrationName](integrationConfig).then(
          integration => {
            return {
              ...integrations,
              [integrationName]: integration,
            }
          }
        )
      }

      log.scope().info(`Skipping ${integrationName}`)
      return integrations
    }, {})
  )
}
