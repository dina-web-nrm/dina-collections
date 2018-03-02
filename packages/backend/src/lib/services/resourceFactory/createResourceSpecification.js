module.exports = function createResourceSpecification(
  resourceSpecificationInput
) {
  const resourcePlural =
    resourceSpecificationInput.resourcePlural ||
    `${resourceSpecificationInput.resource}s`
  const operations = resourceSpecificationInput.operations || []
  return {
    ...resourceSpecificationInput,
    operations,
    resourcePlural,
  }
}
