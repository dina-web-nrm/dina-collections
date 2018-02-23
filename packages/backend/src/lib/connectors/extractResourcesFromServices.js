module.exports = function exportResourcesFromServices(services) {
  return Object.keys(services).reduce((resources, serviceName) => {
    const serviceResources = services[serviceName].resources || {}
    return {
      ...resources,
      ...serviceResources,
    }
  }, {})
}
