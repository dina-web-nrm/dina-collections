module.exports = function createOperationObjectConfiguration({
  operationConfigurationInput,
  resourceSpecification,
  serviceName,
}) {
  const {
    connect = true,
    exampleResponses,
    queryParams,
  } = operationConfigurationInput

  const availableExamples = Object.keys(exampleResponses || {})

  // TODO add id
  return {
    ...operationConfigurationInput,
    ...resourceSpecification,
    availableExamples,
    connect,
    queryParams,
    serviceName,
  }
}
