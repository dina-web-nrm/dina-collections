module.exports = function addExampleToQueryParams({
  availableExamples,
  queryParams,
}) {
  let updatedQueryParams = {
    ...queryParams,
  }

  updatedQueryParams = {
    ...updatedQueryParams,
    exampleId: {
      description:
        'Set to return a specific example. If example dont exist 404 will be returned. Only active when combined with mock parameter',
      schema: {
        enum: availableExamples.length ? availableExamples : undefined,
        type: 'string',
      },
    },
  }

  return updatedQueryParams
}
