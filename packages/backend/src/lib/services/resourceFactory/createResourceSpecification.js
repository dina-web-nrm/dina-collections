module.exports = function createResourceSpecification(
  resourceSpecificationInput
) {
  const resourcePath =
    resourceSpecificationInput.resourcePath ||
    `${resourceSpecificationInput.resource}s`
  const operations = resourceSpecificationInput.operations || []
  return {
    ...resourceSpecificationInput,
    operations,
    resourcePath,
  }
}
