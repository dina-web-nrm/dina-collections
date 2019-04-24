module.exports = function getCustomControllerFactories({
  serviceSpecifications,
}) {
  const { services } = serviceSpecifications
  return Object.keys(services).reduce((controllers, serviceName) => {
    const serviceControllers = services[serviceName].controllers || {}
    return {
      ...controllers,
      ...serviceControllers,
    }
  }, {})
}
