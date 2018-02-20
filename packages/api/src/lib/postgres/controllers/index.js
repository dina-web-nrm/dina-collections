const createLog = require('../../../utilities/log')

const log = createLog('lib/postgres/controllers/bootstrapControllers')

const extractControllersFromApis = apis => {
  return Object.keys(apis).reduce((controllers, apiName) => {
    const { controller } = apis[apiName]
    if (!controller) {
      return controllers
    }
    return {
      ...controllers,
      [apiName]: controller,
    }
  }, {})
}

module.exports = function bootstrapControllers({
  apis,
  config,
  models,
  sequelize,
}) {
  log.info('Bootstrap controllers started')
  const controllers = extractControllersFromApis(apis)
  return Promise.resolve(
    Object.keys(controllers).reduce((obj, key) => {
      log.info(`Bootstrap controller ${key}`)
      return {
        ...obj,
        [key]: controllers[key]({ config, models, sequelize }),
      }
    }, {})
  ).then(bootstrapedControllers => {
    log.info('Bootstrap controllers done')
    return bootstrapedControllers
  })
}
