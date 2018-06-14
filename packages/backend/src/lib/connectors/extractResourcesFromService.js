module.exports = function extractResourcesFromService(services = {}) {
  return services.resources || {}
}
