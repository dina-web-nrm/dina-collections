const extractControllersFromModules = modules => {
  return Object.keys(modules).reduce((controllers, moduleName) => {
    const controller = modules[moduleName].controller
    if (!controller) {
      return controllers
    }
    return {
      ...controllers,
      [moduleName]: controller,
    }
  }, {})
}

module.exports = function createControllers({
  config,
  models,
  modules,
  sequelize,
}) {
  const controllers = extractControllersFromModules(modules)
  return Promise.resolve(
    Object.keys(controllers).reduce((obj, key) => {
      return {
        ...obj,
        [key]: controllers[key]({ config, models, sequelize }),
      }
    }, {})
  )
}
