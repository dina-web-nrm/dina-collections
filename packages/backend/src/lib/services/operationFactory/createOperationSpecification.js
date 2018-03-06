module.exports = function createOperationObjectSpecification({
  operationSpecificationInput,
  resourceSpecification,
}) {
  const {
    connect = true,
    exampleResponses,
    queryParams: queryParamsInput,
  } = operationSpecificationInput

  const availableExamples = Object.keys(exampleResponses || {})
  const queryParams = {
    ...queryParamsInput,
    exampleId: {
      description:
        'Set to return a specific example. If example dont exist 404 will be returned. Only active when combined with mock parameter',
      schema: {
        enum: availableExamples.length ? availableExamples : undefined,
        type: 'string',
      },
    },
    mock: {
      description: 'Will return mock data',
      example: 'false',
      schema: {
        default: 'false',
        type: 'string',
      },
    },
  }

  // TODO add id
  return {
    ...operationSpecificationInput,
    ...resourceSpecification,
    connect,
    queryParams,
  }
}
