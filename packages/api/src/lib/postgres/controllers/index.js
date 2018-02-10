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

module.exports = function createControllers({
  apis,
  config,
  models,
  sequelize,
}) {
  const controllers = extractControllersFromApis(apis)
  return Promise.resolve(
    Object.keys(controllers).reduce((obj, key) => {
      return {
        ...obj,
        [key]: controllers[key]({ config, models, sequelize }),
      }
    }, {})
  )
}
