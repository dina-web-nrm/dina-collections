module.exports = function getCustomControllerFactories(services) {
  return Object.keys(services).reduce((controllers, serviceName) => {
    const serviceControllers = services[serviceName].controllers || {}
    return {
      ...controllers,
      ...serviceControllers,
    }
  }, {})
}
