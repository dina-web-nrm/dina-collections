const chainPromises = require('common/src/chainPromises')
const createLog = require('../../../../utilities/log')
const {
  extractLoadInitialDataFromServices,
  orderInitialDataFactories,
} = require('./utilities')

const log = createLog('lib/sequelize', 1)

module.exports = function loadInitialData({ config, services, models }) {
  if (!config.db.flushOnRestart || !config.db.loadInitialData) {
    log.debug(
      `Dont load initial data: flushOnRestart = ${
        config.db.flushOnRestart
      }, loadInitialData = ${config.db.loadInitialData}`
    )
    return Promise.resolve(true)
  }
  log.debug('Load initial data:')
  const loadInitialDataFactories = orderInitialDataFactories({
    config,
    factories: extractLoadInitialDataFromServices(services),
  })

  return chainPromises(
    loadInitialDataFactories.map(
      ({ serviceName, loadInitialData: loadInitialDataFunction }) => {
        return () => {
          log.scope().debug(`${serviceName}`)
          return Promise.resolve(
            loadInitialDataFunction({
              config,
              models,
            })
          )
        }
      }
    )
  )
}
