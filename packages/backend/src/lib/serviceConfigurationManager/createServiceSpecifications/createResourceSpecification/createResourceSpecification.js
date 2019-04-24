module.exports = function createResourceSpecification({
  resourceConfiguration,
  serviceBasePath,
}) {
  const resourcePath =
    resourceConfiguration.resourcePath || `${resourceConfiguration.resource}s`
  const operations = resourceConfiguration.operations || []
  return {
    basePath: serviceBasePath,
    ...resourceConfiguration, // Might override basePath
    operations,
    resourcePath,
  }
}
