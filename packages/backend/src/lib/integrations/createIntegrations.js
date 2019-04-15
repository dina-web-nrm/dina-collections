const createLog = require('../../utilities/log')
const integrationFactories = require('./factories')

const defaultLog = createLog('integrations')

module.exports = function createIntegrations({
  config,
  log = defaultLog,
} = {}) {
  if (!config.integrations) {
    log.scope().warning('No integrations configured')
    return null
  }

  return Promise.resolve(
    Object.keys(config.integrations).reduce((integrations, integrationName) => {
      const integrationConfig = config.integrations[integrationName]

      if (integrationConfig.active && integrationFactories[integrationName]) {
        log.info(`initializing ${integrationName}`)
        return integrationFactories[integrationName](integrationConfig).then(
          integration => {
            return {
              ...integrations,
              [integrationName]: integration,
            }
          }
        )
      }

      log.info(`skipping ${integrationName}`)
      return integrations
    }, {})
  )
}
