module.exports = function removeInactiveServices({
  serviceConfigurations,
  config,
}) {
  return Object.keys(serviceConfigurations).reduce((services, serviceName) => {
    if (config && config.services && !config.services[serviceName]) {
      return services
    }

    return {
      ...services,
      [serviceName]: serviceConfigurations[serviceName],
    }
  }, {})
}
