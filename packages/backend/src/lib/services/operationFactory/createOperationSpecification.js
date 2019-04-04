module.exports = function createOperationObjectSpecification({
  operationSpecificationInput,
  resourceSpecification,
  serviceName,
}) {
  const {
    connect = true,
    exampleResponses,
    queryParams,
  } = operationSpecificationInput

  const availableExamples = Object.keys(exampleResponses || {})

  // TODO add id
  return {
    ...operationSpecificationInput,
    ...resourceSpecification,
    availableExamples,
    connect,
    queryParams,
    serviceName,
  }
}
