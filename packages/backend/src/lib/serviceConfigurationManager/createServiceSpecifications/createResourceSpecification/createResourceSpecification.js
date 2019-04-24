module.exports = function createResourceSpecification(resourceConfiguration) {
  const resourcePath =
    resourceConfiguration.resourcePath || `${resourceConfiguration.resource}s`
  const operations = resourceConfiguration.operations || []
  return {
    ...resourceConfiguration,
    operations,
    resourcePath,
  }
}
